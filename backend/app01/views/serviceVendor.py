from rest_framework.viewsets import ModelViewSet
from app01.models import ServiceVendor
from app01.serializers import ServiceVendorSerializer

class ServiceVendorView(ModelViewSet):
    queryset = ServiceVendor.objects.all()
    serializer_class = ServiceVendorSerializer