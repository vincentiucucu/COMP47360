import django_filters
from app01.models import BusinessUnit,Vendor,Service,Log
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D

class BusinessUnitFilter(django_filters.FilterSet):
    unit_name = django_filters.CharFilter(lookup_expr='icontains')
    permit_id = django_filters.CharFilter(lookup_expr='iexact')
    permit_expiry_date = django_filters.DateFromToRangeFilter(field_name='permit_expiry_date')
    unit_type = django_filters.CharFilter(lookup_expr='icontains')


    class Meta:
        model = BusinessUnit
        fields = ['unit_name', 'permit_id', 'permit_expiry_date', 'unit_type']


class VendorFilter(django_filters.FilterSet):
    vendor_name = django_filters.CharFilter(lookup_expr='icontains')
    licence_id = django_filters.CharFilter(lookup_expr='iexact')
    licence_expiry_date = django_filters.DateFromToRangeFilter(field_name='licence_expiry_date')
    vendor_email = django_filters.CharFilter(lookup_expr='icontains')
    vendor_phone_number = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Vendor
        fields = ['vendor_name', 'licence_id', 'licence_expiry_date', 'vendor_email', 'vendor_phone_number']


class ServiceFilter(django_filters.FilterSet):
    unit = django_filters.NumberFilter(field_name='unit__unit_id')
    service_date = django_filters.DateFromToRangeFilter(field_name='service_date')
    service_start_time_after = django_filters.TimeFilter(field_name='service_start_time', lookup_expr='gte')
    service_start_time_before = django_filters.TimeFilter(field_name='service_start_time', lookup_expr='lte')
    service_end_time_after = django_filters.TimeFilter(field_name='service_end_time', lookup_expr='gte')
    service_end_time_before = django_filters.TimeFilter(field_name='service_end_time', lookup_expr='lte')
    location_coords = django_filters.CharFilter(method='filter_location_coords')
    location_address = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Service
        fields = ['unit', 'service_date', 'service_start_time_after', 'service_start_time_before', 'service_end_time_after', 'service_end_time_before', 'location_coords', 'location_address']

    def filter_location_coords(self, queryset, name, value):
        try:
            lat, lng = map(float, value.split(','))
            point = Point(lng, lat)
            return queryset.filter(location_coords__distance_lte=(point, D(m=10)))  # 10 meters radius
        except ValueError:
            return queryset.none()


class LogFilter(django_filters.FilterSet):
    operation = django_filters.CharFilter(lookup_expr='icontains')
    entity = django_filters.CharFilter(lookup_expr='icontains')
    entity_id = django_filters.NumberFilter()
    description = django_filters.CharFilter(lookup_expr='icontains')
    timestamp = django_filters.DateTimeFromToRangeFilter(field_name='timestamp')

    class Meta:
        model = Log
        fields = ['operation', 'entity', 'entity_id', 'description', 'timestamp']