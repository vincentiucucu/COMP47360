from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import PermissionDenied
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from app01.models import Vendor
from app01.serializers import VendorSerializer

from app01.views.pagination import Pagination
from app01.views.filters import VendorFilter

from datetime import timedelta, datetime
from django.utils.timezone import now

class VendorView(ModelViewSet):
    serializer_class = VendorSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [DjangoFilterBackend, OrderingFilter,SearchFilter]
    filterset_class = VendorFilter

    search_fields = ['licence_id', 'vendor_name', 'vendor_email', 'vendor_phone_number']
    # GET /api/vendor /?search = John
    '''
    search John in the all fields in search_fields
    ^ : indicates that it begins with a specified string.
    = : indicates an exact match.
    @ : Indicates full-text search (only in databases that support full-text search).
    No prefix: indicates the contain relationship
    
    '''
    ordering_fields = ['licence_expiry_date']
    ordering = ['-licence_expiry_date']
    # The data will be ordered through licence_expiry_date
    # "-":indicates order from new to old
    # No prefix:indicates order from new to new

    pagination_class = Pagination
    # GET /api/vendors/?page=2&size=10
    # page:which page you want
    # size:how many rows of data in a page

    def get_queryset(self):
        # Ensure businesses only see their own vendors
        return Vendor.objects.filter(business=self.request.user)
    
    def perform_create(self, serializer):
        # Set the business field to the authenticated business when adding a new vendor
        serializer.save(business=self.request.user)
    
    def perform_update(self, serializer):
        # Ensure users can only update their own vendors
        if serializer.instance.business != self.request.user:
            raise PermissionDenied("You do not have permission to edit this vendor's information.")
        serializer.save()

    def perform_destroy(self, instance):
        # Ensure users can only delete their own vendors
        if instance.business != self.request.user:
            raise PermissionDenied("You do not have permission to remove this vendor.")
        instance.delete()


    # GET  http://127.0.0.1:8000/api/vendor/recent/?days=1
    @action(detail=False, methods=['get'])
    def recent(self, request):
        days = request.query_params.get('days', 7)
        try:
            days = int(days)
        except ValueError:
            return Response({'error': 'Invalid value for days'})
        start_date = now() - timedelta(days=days)
        recent_events = self.queryset.filter(licence_expiry_date__gte=start_date, licence_expiry_date__lte=now()).order_by('-licence_expiry_date')
        serializer = self.get_serializer(recent_events, many=True)
        return Response(serializer.data)

# Example of return results based on Pagination
'''
{
    "links": {
        "next": "http://example.com/api/vendors/recent_vendors/?page=2",
        "previous": null
    },
    "total_items": 20,
    "total_pages": 2,
    "current_page": 1,
    "page_size": 10,
    "results": [
        {
            "vendor_id": 21,
            "business": 1,
            "vendor_name": "Vendor 21",
            "licence_id": "LIC21",
            "licence_expiry_date": "2024-07-10",
            "vendor_email": "vendor21@example.com",
            "vendor_phone_number": "1234567890",
            "created_at": "2024-07-09T12:34:56Z"
        },
        {
            "vendor_id": 20,
            "business": 1,
            "vendor_name": "Vendor 20",
            "licence_id": "LIC20",
            "licence_expiry_date": "2024-07-09",
            "vendor_email": "vendor20@example.com",
            "vendor_phone_number": "0987654321",
            "created_at": "2024-07-08T12:34:56Z"
        },
        ...
    ]
}


'''
