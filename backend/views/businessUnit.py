from rest_framework.viewsets import ModelViewSet
from app01.models import BusinessUnit
from app01.serializer import BusinessUnitSerializer
from app01.views.auth import MyAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class BusinessUnitView(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    permission_classes = [IsAuthenticated]
    queryset = BusinessUnit.objects.all()
    serializer_class = BusinessUnitSerializer

