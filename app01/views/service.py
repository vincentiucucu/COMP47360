from app01.models import BusinessData, BusinessUnit, Vendor
from django.shortcuts import render
from datetime import date
def plan_service(request):
    business_units = BusinessUnit.objects.all()
    vendors = Vendor.objects.all()
    context = {
        'business_units': business_units,
        'vendors': vendors
    }
    return render(request, 'service.html', context)