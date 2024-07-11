from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from app01.models import Vendor
from app01.serializers import VendorSerializer
from django_filters import OrderingFilter
from app01.view.pagination import Pagination
from filters import VendorFilter

class VendorView(ModelViewSet):

    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = VendorFilter

    ordering_fields = ['licence_expiry_date']
    ordering = ['licence_expiry_date']

    pagination_class = Pagination