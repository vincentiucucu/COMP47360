from app01.models import Business
from rest_framework import generics
from app01.serializers import BusinessSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class RegisterBusinessView(generics.CreateAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]