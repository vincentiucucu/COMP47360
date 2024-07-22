from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from app01.views import RegisterBusinessView, get_busyness_scores, get_recommendations_view
from rest_framework.routers import DefaultRouter
from app01.view import businessUnit, log, service, vendor,serviceVendor
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import AllowAny

router = DefaultRouter()
router.register(prefix="businessUnit", viewset=businessUnit.BusinessUnitView, basename='businessUnit')
router.register(prefix="vendor", viewset=vendor.VendorView, basename='vendor')
router.register(prefix="service", viewset=service.ServiceView, basename='service')
router.register(prefix='log', viewset=log.LogView, basename='log')
router.register(prefix='serviceVendor',viewset=serviceVendor.ServiceVendorView,basename='serviceVendor')
urlpatterns = [
    path("admin/", admin.site.urls),
    path("signup/", RegisterBusinessView.as_view(), name="signup"),
    path("login/", TokenObtainPairView.as_view(), name="get_token"),
    path("login/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("api-auth", include("rest_framework.urls")),
    path('get_busyness_scores/', get_busyness_scores, name='get_busyness_scores'),
    path('get_recommendations/', get_recommendations_view, name='get_recommendations'),

    path('docs/', include_docs_urls(title='Drf api', description='xxx',permission_classes=[AllowAny])),
    path("api/", include(router.urls)),
]

