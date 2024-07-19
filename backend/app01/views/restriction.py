from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from app01.models import Restriction
from app01.serializers import RestrictionSerializer
from rest_framework.filters import OrderingFilter, SearchFilter
from app01.views.pagination import Pagination
from app01.views.filters import RestrictionFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import timedelta
from django.utils.timezone import now

class RestrictionView(ModelViewSet):
    queryset = Restriction.objects.all()
    serializer_class = RestrictionSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_class = RestrictionFilter
    pagination_class = Pagination
    search_fields = [
        'restriction_street',
        'restriction_fstreet',
        'restriction_tstreet',
    ]
    ordering_fields = [
        'restriction_ftime',
        'restriction_ttime'
    ]
    ordering = ['-restriction_ftime','-restriction_ttime']

    @action(detail=False, methods=['get'])
    def recent(self, request):
        recent_restrictions = self.queryset.order_by('-restriction_id')[:10]
        serializer = self.get_serializer(recent_restrictions, many=True)
        return Response(serializer.data)