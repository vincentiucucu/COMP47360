from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from app01.models import ZoneBusynessScore
from app01.serializers import ZoneBusynessScoreSerializer
from rest_framework.filters import OrderingFilter, SearchFilter
from app01.views.pagination import Pagination
from app01.views.filters import BusynessScoreFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import now
from datetime import timedelta,datetime

class BusynessScoreView(ModelViewSet):
    queryset = ZoneBusynessScore.objects.all()
    serializer_class = ZoneBusynessScoreSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_class = BusynessScoreFilter
    pagination_class = Pagination
    search_fields = ['score', 'zone']
    ordering_fields = ['hour']
    ordering=['-hour']



    # http://127.0.0.1:8000/api/busyness_score/recent/?days=1
    @action(detail=False, methods=['get'])
    def recent(self, request):
        days = request.query_params.get('days', 7)
        try:
            days = int(days)
        except ValueError:
            return Response({'error': 'Invalid value for days'})
        start_date = now() - timedelta(days=days)
        recent_events = self.queryset.filter(hour__gte=start_date, hour__lte=now()).order_by('-hour')
        serializer = self.get_serializer(recent_events, many=True)
        return Response(serializer.data)


    # http://127.0.0.1:8000/api/busyness_score/today
    @action(detail=False, methods=['get'])
    def today(self, request):
        start_date = datetime.combine(now().date(), datetime.min.time())
        end_date = datetime.combine(now().date(), datetime.max.time())
        today_events = self.queryset.filter(hour__gte=start_date, hour__lte=end_date).order_by('hour')
        serializer = self.get_serializer(today_events, many=True)
        return Response(serializer.data)


    # http://127.0.0.1:8000/api/busyness_score/future/?days=1
    @action(detail=False, methods=['get'])
    def future(self, request):
        days = request.query_params.get('days', 7)
        try:
            days = int(days)
        except ValueError:
            return Response({'error': 'Invalid value for days'})
        end_date = now() + timedelta(days=days)
        future_events = self.queryset.filter(hour__lte=end_date, hour__gte=now()).order_by('hour')
        serializer = self.get_serializer(future_events, many=True)
        return Response(serializer.data)
