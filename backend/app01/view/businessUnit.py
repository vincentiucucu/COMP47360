from rest_framework.viewsets import ModelViewSet
from app01.models import BusinessUnit
from app01.serializers import BusinessUnitSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import OrderingFilter
from filters import BusinessUnitFilter
from app01.view.pagination import Pagination


class BusinessUnitView(ModelViewSet):

    queryset = BusinessUnit.objects.all()
    serializer_class = BusinessUnitSerializer

    filter_backends = [DjangoFilterBackend,OrderingFilter]
    filterset_class = BusinessUnitFilter

    ordering_fields = ['permit_expiry_date']
    ordering = ['permit_expiry_date']

    pagination_class = Pagination