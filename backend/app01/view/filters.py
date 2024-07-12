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
'''
GET /api/business_units/?unit_name=Central
unit_name: Filters by name containing "Central".

GET /api/business_units/?permit_id=ABC123
permit_id: Filters by license ID exactly matching "ABC123".

GET /api/business_units/?permit_expiry_date_after=2023-01-01&permit_expiry_date_before=2023-12-31
permit_expiry_date_after and permit_expiry_date_before: Filters by permit_expiry_date from 2023-01-01 to 2023-12-31.

GET /api/business_units/?unit_type=Retail
unit_type: Filters by unit type containing "Retail".

'''




class VendorFilter(django_filters.FilterSet):
    vendor_name = django_filters.CharFilter(lookup_expr='icontains')
    licence_id = django_filters.CharFilter(lookup_expr='iexact')
    licence_expiry_date = django_filters.DateFromToRangeFilter(field_name='licence_expiry_date')
    vendor_email = django_filters.CharFilter(lookup_expr='icontains')
    vendor_phone_number = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Vendor
        fields = ['vendor_name', 'licence_id', 'licence_expiry_date', 'vendor_email', 'vendor_phone_number']
'''
GET /api/vendors/?vendor_name=John
vendor_name: Filters by name containing "John".

GET /api/vendors/?licence_id=LIC123
licence_id: Filters by license ID exactly matching "LIC123".

GET /api/vendors/?licence_expiry_date_after=2023-01-01&licence_expiry_date_before=2023-12-31
licence_expiry_date_after and licence_expiry_date_before: Filters by licence_expiry_date from 2023-01-01 to 2023-12-31.

GET /api/vendors/?vendor_email=example.com
vendor_email: Filters by email containing "example.com".

GET /api/vendors/?vendor_phone_number=1234
vendor_phone_number: Filter by phone number containing "1234".

'''

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

'''

GET /api/services/?unit=1
unit:Filter records where unit equals 1

GET /api/services/?service_date_after=2023-01-01&service_date_before=2023-12-31
service_date_after and service_date_before: Filters by service_date from 2023-01-01 to 2023-12-31.

GET /api/services/?service_start_time_after=08:00&service_start_time_before=10:00
service_start_time_after and service_start_time_before: Filters by service_start_time from 8:00 to 10:00.

GET /api/services/?service_end_time_after=16:00&service_end_time_before=18:00
service_end_time_after and service_end_time_before: Filters by service_end_time from 16:00 to 18:00.

GET /api/services/?location_coords=40.7128,-74.0060,10
Search for services located at latitude 40.7128, longitude -74.0060 with a radius of 10 km

GET /api/services/?location_address=Main%20Street
location_address: Filter by location_address containing "Main Street".

space：%20
# ：%23
? ：%3F
/ ：%2F

'''



class LogFilter(django_filters.FilterSet):
    operation = django_filters.CharFilter(lookup_expr='icontains')
    entity = django_filters.CharFilter(lookup_expr='icontains')
    entity_id = django_filters.NumberFilter()
    description = django_filters.CharFilter(lookup_expr='icontains')
    timestamp = django_filters.DateTimeFromToRangeFilter(field_name='timestamp')

    class Meta:
        model = Log
        fields = ['operation', 'entity', 'entity_id', 'description', 'timestamp']



'''
GET /api/logs/?operation=selling
operation: Filter by operation containing "selling".

GET /api/logs/?entity=user
entity: Filter by operation containing "user".

GET /api/logs/?entity_id=123
entity_id: Filter entity_id where entity_id equals 123

GET /api/logs/?description=good
description:Filter by description containing "good".

GET /api/logs/?timestamp_after=2023-01-01T00:00:00&timestamp_before=2023-12-31T23:59:59
timestamp: Filters by service_end_time from from 2023-01-01 00:00:00 to 2023-12-31 23:59:59.

"T" is a delimiter used to separate the date and time parts
'''