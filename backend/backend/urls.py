from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from app01.views import RegisterBusinessView, get_busyness_scores, get_recommendations_view

urlpatterns = [
    path("admin/", admin.site.urls),
    path("signup/", RegisterBusinessView.as_view(), name="signup"),
    path("login/", TokenObtainPairView.as_view(), name="get_token"),
    path("login/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("api-auth", include("rest_framework.urls")),
    path('get_busyness_scores/', get_busyness_scores, name='get_busyness_scores'),
    path('get_recommendations/', get_recommendations_view, name='get_recommendations')
]
