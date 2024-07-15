from app01.models import Business,BusinessUnit,Vendor,Service,Log,ServiceVendor
from rest_framework import serializers
from django.contrib.gis.geos import Point

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
        fields = [ 'business', 'unit_name', 'permit_id', 'permit_expiry_date', 'unit_type']




class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['business','vendor_name','licence_id','licence_expiry_date','vendor_email','vendor_phone_number' ]



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

