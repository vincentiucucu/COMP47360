from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from app01.models import Service
from app01.serializers import ServiceSerializer
from rest_framework.filters import OrderingFilter,SearchFilter
from app01.view.pagination import Pagination
from filters import ServiceFilter
from rest_framework.decorators import action
from rest_framework.response import Response

class ServiceView(ModelViewSet):

    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter,SearchFilter]
    filterset_class = ServiceFilter

    search_fields = ['location_address']

    ordering_fields = ['service_date', 'service_start_time', 'service_end_time']
    ordering = ['-service_date', '-service_start_time', '-service_end_time']

    pagination_class = Pagination

    @action(detail=False, methods=['get'])
    def recent_services(self, request):
        recent_services = Service.objects.all().order_by('-created_at')[:10]
        page = self.paginate_queryset(recent_services)
        if page is not None:
            return self.get_paginated_response(page)
        serializer = self.get_serializer(recent_services, many=True)
        return Response(serializer.data)