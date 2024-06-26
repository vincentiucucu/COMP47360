from django.shortcuts import render, HttpResponse, redirect
from django.db.models import Sum

# from app01.models import BusinessUnit, Vendor, Location
# def index(request):
#     # account_data = request.GET.get("")
#     total_revenue = BusinessUnit.objects.aggregate(Sum('revenue'))['revenue__sum']
#     profitable_location = Location.objects.order_by('-revenue').first()
#     best_unit = BusinessUnit.objects.order_by('-revenue').first()
#     best_vendor = Vendor.objects.first()  #
#     upcoming_business = [
#         {"date": "2024-06-25", "time": "11:00 - 15:00", "unit": "AA08267", "vendor": "C4049",
#          "address": "W. Durham Street New York, NY 10027", "eft": 4000},
#         {"date": "2024-06-25", "time": "18:00 - 21:00", "unit": "AA09473", "vendor": "C4078",
#          "address": "Riverview St. Levittown, NY 11756", "eft": 6237},
#         {"date": "2024-06-27", "time": "06:30 - 10:30", "unit": "AA08267", "vendor": "C4049",
#          "address": "North Coffee Court New York, NY 10028", "eft": 3843},
#         {"date": "2024-06-27", "time": "15:30 - 21:00", "unit": "AA09473", "vendor": "C4078",
#          "address": "Riverview St. Levittown, NY 11756", "eft": 5297},
#     ]
#
#     context = {
#         'total_revenue': total_revenue,
#         'profitable_location': profitable_location,
#         'best_unit': best_unit,
#         'best_vendor': best_vendor,
#         'upcoming_business': upcoming_business,
#     }
#     return render(request, 'index.html', context)
