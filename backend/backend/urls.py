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
from django.urls import path,include
from app01.views import business,businessUnit,vendor
from rest_framework.documentation import include_docs_urls
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
router = DefaultRouter()
router.register(prefix="businessUnit",viewset=businessUnit.BusinessUnitView,basename='businessUnit')

urlpatterns = [
    path('signup/',business.SignUp.as_view()),
    path('login/',business.Login.as_view()),

    path('logout/',business.Logout.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('docs/', include_docs_urls(title='Drf api', description='xxx')),
    path("",include(router.urls)),

]

