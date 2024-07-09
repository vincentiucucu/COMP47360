from app01.models import Business
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


class LoginSerializer(serializers.Serializer):
    business_name = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        business_name = attrs.get('business_name')
        password = attrs.get('password')

        return attrs



class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()