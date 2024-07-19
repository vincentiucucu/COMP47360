from rest_framework.viewsets import ModelViewSet
from app01.models import BusinessUnit
from app01.serializers import BusinessUnitSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter,SearchFilter
from app01.views.filters import BusinessUnitFilter
from app01.views.pagination import Pagination
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import timedelta
from django.utils.timezone import now

class BusinessUnitView(ModelViewSet):

    queryset = BusinessUnit.objects.all()
    serializer_class = BusinessUnitSerializer

    filter_backends = [DjangoFilterBackend,OrderingFilter,SearchFilter]
    filterset_class = BusinessUnitFilter

    search_fields = ['unit_name', 'permit_id', 'unit_type']

    ordering_fields = ['permit_expiry_date']
    ordering = ['-permit_expiry_date']

    pagination_class = Pagination

    # GET  http://127.0.0.1:8000/api/business_unit/recent/?days=1
    @action(detail=False, methods=['get'])
    def recent(self, request):
        days = request.query_params.get('days', 7)
        try:
            days = int(days)
        except ValueError:
            return Response({'error': 'Invalid value for days'})
        time_ago = now() - timedelta(days=days)
        recent_units = self.queryset.filter(created_at__gte=time_ago).order_by('-created_at')
        serializer = self.get_serializer(recent_units, many=True)
        return Response(serializer.data)