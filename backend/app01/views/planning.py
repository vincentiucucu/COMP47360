from django.shortcuts import render
# from app01.models import BusinessUnit, Vendor, Location,PastService,PlannedService
#
# def planning(request):
#     planned_services = PlannedService.objects.all()
#     past_services = PastService.objects.all()
#     context = {
#         'planned_services': planned_services,
#         'past_services': past_services,
#     }
#     return render(request, 'planning.html', context)
from app01.models import BusinessData, BusinessUnit, Vendor
from datetime import date

def planning(request):
    planned_services = BusinessData.objects.filter(date__gte=date.today()).order_by('date', 'time')
    past_services = BusinessData.objects.filter(date__lt=date.today()).order_by('-date', '-time')
    context = {
        'planned_services': planned_services,
        'past_services': past_services
    }
    return render(request, 'plan.html', context)

