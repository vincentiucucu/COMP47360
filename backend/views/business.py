
from rest_framework.response import Response

from app01.models import Business
from app01.serializer import SignUpSerializer,LoginSerializer,LogoutSerializer
from rest_framework.generics import GenericAPIView,CreateAPIView
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

class SignUp(CreateAPIView):
    serializer_class = SignUpSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response({"code": 1000, "msg": "Successfully signed up"}, status=status.HTTP_201_CREATED)
        return Response({"code": 1002, "error": "Fail to Sign Up", "detail": serializer.errors},
                        status=status.HTTP_400_BAD_REQUEST)




class Login(CreateAPIView,TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        business_name = serializer.validated_data['business_name']
        password = serializer.validated_data['password']
        if not business_name or not password:
            return JsonResponse({
                "code": 1002,
                "error": "Invalid credentials",
                "detail": {"non_field_errors": ["Both business_name and password are required."]}
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            business = Business.objects.get(business_name=business_name)

            if not business.is_active:
                return JsonResponse({
                    "code": 1003,
                    "error": "User is inactive",
                    "detail": {"non_field_errors": ["User account is not active."]}
                }, status=status.HTTP_403_FORBIDDEN)

            business.password = business.password.strip()
            password = password.strip()
            if business.password == password:

                refresh = RefreshToken.for_user(business)

                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'code': 1000,
                    'msg': 'Successfully logged in'
                }, status=status.HTTP_200_OK)
            else:
                return JsonResponse({"code": 1002, "error": "Invalid credentials", "detail": {"non_field_errors": ["Incorrect  password."]}}, status=status.HTTP_400_BAD_REQUEST)
        except Business.DoesNotExist:
            return JsonResponse({"code": 1002, "error": "Invalid credentials", "detail": {"non_field_errors": ["Incorrect business_name ."]}}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class Logout(generics.CreateAPIView):
    serializer_class = LogoutSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"code": 1002, "error": "Refresh token is required"},
                                status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"code": 1000, "msg": "Successfully logged out"}, status=status.HTTP_200_OK)
        except TokenError as e:
            return Response({"code": 1002, "error": "Invalid token", "detail": str(e)},
                            status=status.HTTP_400_BAD_REQUEST)
