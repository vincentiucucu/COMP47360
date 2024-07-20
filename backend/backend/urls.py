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
from app01.view import RegisterBusinessView, get_busyness_scores, get_recommendations_view
from rest_framework.routers import DefaultRouter
from app01.views import business_unit, log, service, vendor,serviceVendor,zoned_street,restriction,busyness_score,event
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import AllowAny

router = DefaultRouter()
router.register(prefix="business_unit", viewset=business_unit.BusinessUnitView, basename='businessUnit')
router.register(prefix="vendor", viewset=vendor.VendorView, basename='vendor')
router.register(prefix="service", viewset=service.ServiceView, basename='service')
router.register(prefix='log', viewset=log.LogView, basename='log')
router.register(prefix='serviceVendor',viewset=serviceVendor.ServiceVendorView,basename='serviceVendor')
router.register(prefix='zoned_street',viewset=zoned_street.ZonedStreetView,basename='zoned_street')
router.register(prefix='restriction',viewset=restriction.RestrictionView,basename='restriction')
router.register(prefix='busyness_score',viewset=busyness_score.BusynessScoreView,basename='busynessScore')
router.register(prefix='event',viewset=event.EventView,basename='event')

urlpatterns = [
    path("admin/", admin.site.urls),
    path("signup/", RegisterBusinessView.as_view(), name="signup"),
    path("login/", TokenObtainPairView.as_view(), name="get_token"),
    path("login/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("api-auth", include("rest_framework.urls")),
    path('docs/', include_docs_urls(title='Drf api', description='xxx',permission_classes=[AllowAny])),
    path('get_busyness_scores/', get_busyness_scores, name='get_busyness_scores'),
    path('get_recommendations/', get_recommendations_view, name='get_recommendations'),
    
    path("api/", include(router.urls)),
]
