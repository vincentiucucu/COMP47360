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
from django.urls import path
# from app01.views import account,business,planning,overview,service
urlpatterns = [
    # path("admin/", admin.site.urls),
    # path('login/', account.login),
    # path('logout/', account.logout),
    # path('register2/', account.register),
    # path('',overview.overview),
    # path('overview/', overview.overview),
    #
    # path('image/code/', account.image_code),
    # path('business/',business.my_business),
    # path('planning/',planning.planning),
    # path('service/',service.plan_service),

]
