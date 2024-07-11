from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from app01.models import Service
from app01.serializers import ServiceSerializer
from django_filters import OrderingFilter
from app01.view.pagination import Pagination
from filters import ServiceFilter

class ServiceView(ModelViewSet):

    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ServiceFilter

    ordering_fields = ['service_date', 'service_start_time', 'service_end_time']
    ordering = ['service_date', 'service_start_time', 'service_end_time']

    pagination_class = Pagination