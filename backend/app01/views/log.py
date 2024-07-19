from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from app01.models import Log
from app01.serializers import LogSerializer
from app01.views.pagination import Pagination
from app01.views.filters import LogFilter
from rest_framework.filters import OrderingFilter,SearchFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import timedelta,datetime
from django.utils.timezone import now

class LogView(ModelViewSet):

    queryset = Log.objects.all()
    serializer_class = LogSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter,SearchFilter]
    filterset_class = LogFilter

    search_fields = ['operation', 'entity', 'description']


    ordering_fields = ['timestamp']
    ordering = ['-timestamp']



    pagination_class = Pagination

    # http://127.0.0.1:8000/api/log/recent/?days=1
    @action(detail=False, methods=['get'])
    def recent(self, request):
        days = request.query_params.get('days', 7)
        try:
            days = int(days)
        except ValueError:
            return Response({'error': 'Invalid value for days'})
        start_date = now() - timedelta(days=days)
        recent_events = self.queryset.filter(timestamp__gte=start_date, timestamp__lte=now()).order_by('-timestamp')
        serializer = self.get_serializer(recent_events, many=True)
        return Response(serializer.data)

    # http://127.0.0.1:8000/api/log/today
    @action(detail=False, methods=['get'])
    def today(self, request):
        start_date = datetime.combine(now().date(), datetime.min.time())
        end_date = datetime.combine(now().date(), datetime.max.time())
        today_events = self.queryset.filter(timestamp__gte=start_date, timestamp__lte=end_date).order_by('-timestamp')
        serializer = self.get_serializer(today_events, many=True)
        return Response(serializer.data)

    # http://127.0.0.1:8000/api/log/future/?days=1
    @action(detail=False, methods=['get'])
    def future(self, request):
        days = request.query_params.get('days', 7)
        try:
            days = int(days)
        except ValueError:
            return Response({'error': 'Invalid value for days'})
        end_date = now() + timedelta(days=days)
        future_events = self.queryset.filter(timestamp__lte=end_date, timestamp__gte=now()).order_by('-timestamp')
        serializer = self.get_serializer(future_events, many=True)
        return Response(serializer.data)