from app01.models import Business,BusinessUnit,Vendor,Service,Log,ServiceVendor,ZonedStreet,Restriction,ZoneBusynessScore,Event
from rest_framework import serializers
from django.contrib.gis.geos import Point, MultiPolygon, Polygon, MultiLineString, LineString

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


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['business','unit','service_date','service_start_time','service_end_time','location_coords','location_address']

    def to_internal_value(self, data):
        location_coords = data.get('location_coords')
        if location_coords:
            try:
                lat, lng = map(float, location_coords.split(',')[:2])
                data['location_coords'] = Point(lng, lat)
            except (ValueError, TypeError):
                raise serializers.ValidationError({
                    'location_coords': 'Invalid format for location_coords. It should be "lat,lng".'
                })
        return super().to_internal_value(data)


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = ['business','operation','entity','entity_id','description','timestamp']


class ServiceVendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceVendor
        fields = ['service','vendor','assigned_at']


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