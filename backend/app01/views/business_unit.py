from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import PermissionDenied
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from app01.models import BusinessUnit
from app01.serializers import BusinessUnitSerializer
from app01.views.filters import BusinessUnitFilter
from app01.views.pagination import Pagination

from datetime import timedelta
from django.utils.timezone import now


class BusinessUnitView(ModelViewSet):
    serializer_class = BusinessUnitSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [DjangoFilterBackend,OrderingFilter,SearchFilter]
    filterset_class = BusinessUnitFilter

    search_fields = ['permit_id', 'unit_name', 'unit_type']

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
            return Response({'error': 'Invalid value for days'})
        
        time_ago = now() - timedelta(days=days)
        
        recent_units = self.queryset.filter(created_at__gte=time_ago).order_by('-created_at')
        serializer = self.get_serializer(recent_units, many=True)
        
        return Response(serializer.data)