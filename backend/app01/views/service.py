from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from app01.models import Service
from app01.serializers import ServiceSerializer
from rest_framework.filters import OrderingFilter,SearchFilter
from app01.views.pagination import Pagination
from app01.views.filters import ServiceFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import timedelta,datetime
from django.utils.timezone import now


class ServiceView(ModelViewSet):

    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter,SearchFilter]
    filterset_class = ServiceFilter

    search_fields = ['location_address']

    ordering_fields = ['service_date', 'service_start_time', 'service_end_time']
    ordering = ['-service_date', '-service_start_time', '-service_end_time']

    pagination_class = Pagination

    # http://127.0.0.1:8000/api/service/recent/?days=1
    @action(detail=False, methods=['get'])
    def recent(self, request):
        days = request.query_params.get('days', 7)
        try:
            days = int(days)
        except ValueError:
            return Response({'error': 'Invalid value for days'})
        start_date = now() - timedelta(days=days)
        recent_events = self.queryset.filter(service_date__gte=start_date, service_date__lte=now()).order_by('-service_date')
        serializer = self.get_serializer(recent_events, many=True)
        return Response(serializer.data)

    ''''
    'recent' function filter the 'service_date' form past to now based on the range days you give
    '''

    # http://127.0.0.1:8000/api/service/today
    @action(detail=False, methods=['get'])
    def today(self, request):
        start_date = datetime.combine(now().date(), datetime.min.time())
        end_date = datetime.combine(now().date(), datetime.max.time())
        today_events = self.queryset.filter(service_date__gte=start_date, service_date__lte=end_date).order_by('-service_start_time')
        serializer = self.get_serializer(today_events, many=True)
        return Response(serializer.data)

    '''
    'today' function filter the 'service_date' today
    '''


    # http://127.0.0.1:8000/api/service/future/?days=1
    @action(detail=False, methods=['get'])
    def future(self, request):
        days = request.query_params.get('days', 7)
        try:
            days = int(days)
        except ValueError:
            return Response({'error': 'Invalid value for days'})
        end_date = now() + timedelta(days=days)
        future_services = self.queryset.filter(service_date__lte=end_date, service_date__gte=now()).order_by('service_date')
        serializer = self.get_serializer(future_services, many=True)
        return Response(serializer.data)

    ''''
    'future' function filter the 'service_date' form now to the future based on the days you give
    '''