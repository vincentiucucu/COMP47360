from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from app01.models import TaxiZone
from app01.serializers import TaxiZoneSerializer
from rest_framework.filters import OrderingFilter, SearchFilter
from app01.views.pagination import Pagination
from app01.views.filters import TaxiZoneFilter
from rest_framework.decorators import action
from rest_framework.response import Response

class TaxiZoneView(ModelViewSet):
    queryset = TaxiZone.objects.all()
    serializer_class = TaxiZoneSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_class = TaxiZoneFilter
    pagination_class = Pagination
    search_fields = ['zone_name']
    ordering_fields = ['zone_id']
    ordering = ['zone_id']

    @action(detail=False, methods=['get'])
    def recent(self, request):
        recent_zones = self.queryset.order_by('-zone_id')[:10]
        serializer = self.get_serializer(recent_zones, many=True)
        return Response(serializer.data)