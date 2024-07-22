from rest_framework.viewsets import ModelViewSet
from app01.models import BusinessUnit
from app01.serializers import BusinessUnitSerializer
from rest_framework import permissions

from rest_framework.exceptions import PermissionDenied
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter,SearchFilter
from app01.views.filters import BusinessUnitFilter
from app01.views.pagination import Pagination
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import timedelta,datetime
from django.utils.timezone import now

class BusinessUnitView(ModelViewSet):

    queryset = BusinessUnit.objects.all()
    serializer_class = BusinessUnitSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [DjangoFilterBackend,OrderingFilter,SearchFilter]
    filterset_class = BusinessUnitFilter

    search_fields = ['unit_name', 'permit_id', 'unit_type']

    ordering_fields = ['permit_expiry_date']
    ordering = ['-permit_expiry_date']

    pagination_class = Pagination

    def get_queryset(self):
        # Ensure businesses only see their own business units
        return BusinessUnit.objects.filter(business=self.request.user)

    def perform_create(self, serializer):
        # Set the business field to the authenticated business when adding a new business unit
        serializer.save(business=self.request.user)

    def perform_update(self, serializer):
        # Ensure businesses can only update their own business units
        if serializer.instance.business != self.request.user:
            raise PermissionDenied("You do not have permission to edit this business unit.")
        serializer.save()

    def perform_destroy(self, instance):
        # Ensure businesses can only delete their own business units
        if instance.business != self.request.user:
            raise PermissionDenied("You do not have permission to delete this business unit.")
        instance.delete()


    # GET  http://127.0.0.1:8000/api/business_unit/recent/?days=1
    @action(detail=False, methods=['get'])
    def recent(self, request):
        days = request.query_params.get('days', 7)
        try:
            days = int(days)
        except ValueError:
            return Response({'error': 'Invalid value for days'}, status=400)
        start_date = now().date() - timedelta(days=days)
        recent_units = self.queryset.filter(permit_expiry_date__gte=start_date,
                                            permit_expiry_date__lte=now().date()).order_by('-permit_expiry_date')
        serializer = self.get_serializer(recent_units, many=True)
        return Response(serializer.data)

    '''
    'recent' function filter the 'permit_expiry_date' from past to now based on the range of days you give
    '''

    # GET  http://127.0.0.1:8000/api/business_unit/today
    @action(detail=False, methods=['get'])
    def today(self, request):
        today_date = now().date()
        today_units = self.queryset.filter(permit_expiry_date=today_date).order_by('-permit_expiry_date')
        serializer = self.get_serializer(today_units, many=True)
        return Response(serializer.data)

    '''
    'today' function filter the 'permit_expiry_date' to show today's entries
    '''

    # GET  http://127.0.0.1:8000/api/business_unit/future/?days=1
    @action(detail=False, methods=['get'])
    def future(self, request):
        days = request.query_params.get('days', 7)
        try:
            days = int(days)
        except ValueError:
            return Response({'error': 'Invalid value for days'}, status=400)
        end_date = now().date() + timedelta(days=days)
        future_units = self.queryset.filter(permit_expiry_date__lte=end_date,
                                            permit_expiry_date__gte=now().date()).order_by('permit_expiry_date')
        serializer = self.get_serializer(future_units, many=True)
        return Response(serializer.data)

    '''
    'future' function filter the 'permit_expiry_date' to show entries that will expire in the future within the given range of days
    '''