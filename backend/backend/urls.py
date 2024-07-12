"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from app01.views import RegisterBusinessView
from rest_framework.routers import DefaultRouter
from app01.view import businessUnit, log, service, vendor

router = DefaultRouter()
router.register(prefix="businessUnit", viewset=businessUnit.BusinessUnitView, basename='businessUnit')
router.register(prefix="vendor", viewset=vendor.VendorView, basename='vendor')
router.register(prefix="service", viewset=service.ServiceView, basename='service')
router.register(prefix='log', viewset=log.LogView, basename='log')

urlpatterns = [
    path("admin/", admin.site.urls),
    path("signup/", RegisterBusinessView.as_view(), name="signup"),
    path("login/", TokenObtainPairView.as_view(), name="get_token"),
    path("login/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("api-auth", include("rest_framework.urls")),

    path("api", include(router.urls)),
]
