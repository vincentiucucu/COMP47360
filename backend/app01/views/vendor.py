from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from app01.models import Vendor
from app01.serializers import VendorSerializer
from rest_framework.filters import OrderingFilter,SearchFilter
from app01.views.pagination import Pagination
from app01.views.filters import VendorFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import timedelta,datetime
from django.utils.timezone import now

class VendorView(ModelViewSet):

    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter,SearchFilter]
    filterset_class = VendorFilter

    search_fields = ['^vendor_name', '=licence_id', '@vendor_email', 'vendor_phone_number']
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

    # http://127.0.0.1:8000/api/vendor/today
    @action(detail=False, methods=['get'])
    def today(self, request):
        start_date = datetime.combine(now().date(), datetime.min.time())
        end_date = datetime.combine(now().date(), datetime.max.time())
        today_events = self.queryset.filter(licence_expiry_date__gte=start_date, licence_expiry_date__lte=end_date).order_by('licence_expiry_date')
        serializer = self.get_serializer(today_events, many=True)
        return Response(serializer.data)



    # GET  http://127.0.0.1:8000/api/vendor/future/?days=1
    @action(detail=False, methods=['get'])
    def future(self, request):
        days = request.query_params.get('days', 7)
        try:
            days = int(days)
        except ValueError:
            return Response({'error': 'Invalid value for days'})
        end_date = now() + timedelta(days=days)
        recent_vendors = self.queryset.filter(licence_expiry_date__lte=end_date, licence_expiry_date__gte=now()).order_by('licence_expiry_date')[:10]
        serializer = self.get_serializer(recent_vendors, many=True)
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
