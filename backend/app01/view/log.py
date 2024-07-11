from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from app01.models import Log
from app01.serializers import LogSerializer
from django_filters import OrderingFilter
from app01.view.pagination import Pagination
from filters import LogFilter

class LogView(ModelViewSet):

    queryset = Log.objects.all()
    serializer_class = LogSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = LogFilter

    ordering_fields = ['timestamp']
    ordering = ['timestamp']

    pagination_class = Pagination