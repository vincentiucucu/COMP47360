from rest_framework.viewsets import ModelViewSet
from app01.models import BusinessUnit
from app01.serializers import BusinessUnitSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter,SearchFilter
from app01.view.filters import BusinessUnitFilter
from app01.view.pagination import Pagination
from rest_framework.decorators import action
from rest_framework.response import Response

class BusinessUnitView(ModelViewSet):

    queryset = BusinessUnit.objects.all()
    serializer_class = BusinessUnitSerializer

    filter_backends = [DjangoFilterBackend,OrderingFilter,SearchFilter]
    filterset_class = BusinessUnitFilter

    search_fields = ['unit_name', 'permit_id', 'unit_type']

    ordering_fields = ['permit_expiry_date']
    ordering = ['-permit_expiry_date']

    pagination_class = Pagination

    @action(detail=False, methods=['get'])
    def recent_units(self, request):
        recent_units = BusinessUnit.objects.all().order_by('-created_at')[:10]
        page = self.paginate_queryset(recent_units)
        if page is not None:
            return self.get_paginated_response(page)
        serializer = self.get_serializer(recent_units, many=True)
        return Response(serializer.data)