from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from app01.models import Log
from app01.serializers import LogSerializer
from app01.view.pagination import Pagination
from filters import LogFilter
from rest_framework.filters import OrderingFilter,SearchFilter
from rest_framework.decorators import action
from rest_framework.response import Response

class LogView(ModelViewSet):

    queryset = Log.objects.all()
    serializer_class = LogSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter,SearchFilter]
    filterset_class = LogFilter

    search_fields = ['operation', 'entity', 'description']


    ordering_fields = ['timestamp']
    ordering = ['-timestamp']



    pagination_class = Pagination

    @action(detail=False, methods=['get'])
    def recent_logs(self, request):
        recent_logs = Log.objects.all().order_by('-timestamp')[:10]
        page = self.paginate_queryset(recent_logs)
        if page is not None:
            return self.get_paginated_response(page)
        serializer = self.get_serializer(recent_logs, many=True)
        return Response(serializer.data)