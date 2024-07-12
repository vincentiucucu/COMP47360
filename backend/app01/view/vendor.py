from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from app01.models import Vendor
from app01.serializers import VendorSerializer
from rest_framework.filters import OrderingFilter,SearchFilter
from app01.view.pagination import Pagination
from filters import VendorFilter
from rest_framework.decorators import action
from rest_framework.response import Response

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



    # GET /api/vendors/recent_vendors/
    @action(detail=False, methods=['get'])
    def recent_vendors(self, request):
        recent_vendors = Vendor.objects.all().order_by('-created_at')[:10]
        page = self.paginate_queryset(recent_vendors)
        if page is not None:
            return self.get_paginated_response(page)
        serializer = self.get_serializer(recent_vendors, many=True)
        return Response(serializer.data)
    # The response returns the 10 most recent Vendor records, with paging information:
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
