from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from app01.models import ZonedStreet
from app01.serializers import ZonedStreetSerializer
from rest_framework.filters import OrderingFilter, SearchFilter
from app01.views.pagination import Pagination
from app01.views.filters import ZonedStreetFilter
from rest_framework.decorators import action
from rest_framework.response import Response

class ZonedStreetView(ModelViewSet):
    queryset = ZonedStreet.objects.all()
    serializer_class = ZonedStreetSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_class = ZonedStreetFilter

    search_fields = ['street_address', 'zone_id']
    ordering_fields = ['zoned_street_id', 'street_address', 'zone_id']
    ordering = ['-zoned_street_id']
    pagination_class = Pagination


    @action(detail=False, methods=['get'])
    def recent(self, request):
        recent_streets = self.queryset.order_by('-zoned_street_id')[:10]
        serializer = self.get_serializer(recent_streets, many=True)
        return Response(serializer.data)