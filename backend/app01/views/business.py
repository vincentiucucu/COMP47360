from django.shortcuts import render
# from app01.models import BusinessUnit, Vendor, Location
# def business(request):
#     business_units = BusinessUnit.objects.all()
#     vendors = Vendor.objects.all()
#     context = {
#         'business_units': business_units,
#         'vendors': vendors,
#         'num_business_units': business_units.count(),
#         'num_vendors': vendors.count(),
#     }
#     return render(request, 'business.html', context)
from app01.models import BusinessData, BusinessUnit, Vendor
from datetime import date


def my_business(request):
    business_units = BusinessUnit.objects.all()
    vendors = Vendor.objects.all()
    upcoming_business = BusinessData.objects.filter(date__gte=date.today()).order_by('date', 'time')
    context = {
        'num_business_units': business_units.count(),
        'num_vendors': vendors.count(),
        'business_units': upcoming_business,
        'authorised_vendors': upcoming_business  # 假设这里用的是相同的业务数据
    }
    return render(request, 'my_business.html', context)