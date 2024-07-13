from app01.models import Business,BusinessUnit,Vendor,Service,Log,ServiceVendor
from rest_framework import serializers

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



class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = ['business','operation','entity','entity_id','description','timestamp']

class ServiceVendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceVendor
        fields = ['service','vendor','assigned_at']