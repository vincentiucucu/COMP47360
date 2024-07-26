from rest_framework import generics
from rest_framework.permissions import AllowAny

from app01.models import Business
from app01.serializers import BusinessSerializer


class RegisterBusinessView(generics.CreateAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]