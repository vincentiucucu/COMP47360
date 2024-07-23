from app01.models import Business,BusinessUnit,Vendor,Service,Log,ServiceVendor,ZonedStreet,Restriction,ZoneBusynessScore,Event
from rest_framework import serializers
from django.contrib.gis.geos import Point, MultiPolygon, Polygon, MultiLineString, LineString

def to_geojson(service):
    return {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [service.location_coords.x, service.location_coords.y]
        },
        "properties": {
            "service_id": service.service_id,
            "service_date": service.service_date,
            "service_start_time": service.service_start_time,
            "service_end_time": service.service_end_time,
            "location_address": service.location_address,
            "revenue": service.revenue,
            "unit": service.unit.permit_id
        }
    }

class BusinessSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Business
        fields = ["business_name", "business_email", "password"]
        extra_kwargs = {
            "password":  {"write_only": True}
        }
    
    def create(self, validated_data):
        return Business.objects.create_user(**validated_data)


class BusinessUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessUnit
        fields = ['permit_id', 'unit_name', 'unit_type', 'permit_expiry_date', "business"]
        read_only_fields = ['business']


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['licence_id', 'vendor_name', 'licence_expiry_date', 'vendor_email', 'vendor_phone_number', 'business']
        read_only_fields = ['business']

class ServiceVendorSerializer(serializers.ModelSerializer):
    vendor_name = serializers.CharField(source='vendor.vendor_name', read_only=True)
    vendor_email = serializers.CharField(source='vendor.vendor_email', read_only=True)

    class Meta:
        model = ServiceVendor
        fields = ['service_vendor_id', 'vendor', 'vendor_name', 'vendor_email']


class ServiceSerializer(serializers.ModelSerializer):
    vendors = serializers.ListField(
        child=serializers.PrimaryKeyRelatedField(queryset=Vendor.objects.all()), write_only=True
    )
    service_vendors = ServiceVendorSerializer(source='servicevendor_set', many=True, read_only=True)

    class Meta:
        model = Service
        fields = ['service_id', 'service_date', 'service_start_time', 'service_end_time', 'location_coords', 'location_address', 'revenue', 'business', 'unit', 'vendors', 'service_vendors']
        read_only_fields = ['service_id', 'business', 'service_vendors']

    def create(self, validated_data):
        vendors_data = validated_data.pop('vendors')
        service = Service.objects.create(**validated_data)
        for vendor in vendors_data:
            ServiceVendor.objects.create(service=service, vendor=vendor)
        return service

    def update(self, instance, validated_data):
        vendors_data = validated_data.pop('vendors', None)
        if vendors_data is not None:
            instance.servicevendor_set.all().delete()
            for vendor in vendors_data:
                ServiceVendor.objects.create(service=instance, vendor=vendor)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = ['business','operation','entity','entity_id','description']
        read_only_fields = ['business']


class RestrictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restriction
        fields = [
            'restriction_street','restriction_fstreet','restriction_tstreet','restriction_street_geometry','restriction_weekday','restriction_ftime','restriction_ttime'
        ]

    def get_restriction_street_geometry(self, obj):
        if isinstance(obj.restriction_street_geometry, MultiLineString):
            return obj.restriction_street_geometry.geojson
        return obj.restriction_street_geometry

    def to_internal_value(self, data):
        restriction_street_geometry = data.get('restriction_street_geometry')
        if restriction_street_geometry:
            try:
                # Assuming the input is a GeoJSON string or similar
                geom = MultiLineString(restriction_street_geometry)
                data['restriction_street_geometry'] = geom
            except (ValueError, TypeError):
                raise serializers.ValidationError({
                    'restriction_street_geometry': 'Invalid format for restriction_street_geometry.'
                })
        return super().to_internal_value(data)



class ZoneBusynessScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZoneBusynessScore
        fields = ['score','zone','hour','centroid']



    def to_internal_value(self, data):
        centroid = data.get('centroid')
        if centroid:
            try:
                lat, lng = map(float, centroid.split(',')[:2])
                data['centroid'] = Point(lng, lat)
            except (ValueError, TypeError):
                raise serializers.ValidationError({
                    'centroid': 'Invalid format for centroid. It should be "lat,lng".'
                })
        return super().to_internal_value(data)


class ZonedStreetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZonedStreet
        fields = ['street_address','street_geometry','street_centroid','zone_id']

    def to_internal_value(self, data):
        street_centroid = data.get('street_centroid')
        if street_centroid:
            try:
                lat, lng = map(float, street_centroid.split(',')[:2])
                data['street_centroid'] = Point(lng, lat)
            except (ValueError, TypeError):
                raise serializers.ValidationError({
                    'street_centroid': 'Invalid format for street_centroid. It should be "lat,lng".'
                })

        street_geometry = data.get('street_geometry')

        if street_geometry:
            try:
                lines = []
                for line_data in street_geometry:
                    line = LineString(*line_data)
                    lines.append(line)
                data['street_geometry'] = MultiLineString(*lines)
            except (ValueError, TypeError):
                raise serializers.ValidationError({
                    'street_geometry': 'Invalid format for street_geometry. It should be a list of linestrings.'
                })

        return super().to_internal_value(data)


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['event_name','start','end','location']

    def to_internal_value(self, data):
        location = data.get('location')
        if location:
            try:
                lat, lng = map(float, location.split(',')[:2])
                data['location'] = Point(lng, lat)
            except (ValueError, TypeError):
                raise serializers.ValidationError({
                    'location': 'Invalid format for location. It should be "lat,lng".'
                })
        return super().to_internal_value(data)