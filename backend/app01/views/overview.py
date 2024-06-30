from app01.models import BusinessData
from django.db.models import Sum
from django.shortcuts import render
from datetime import date

def overview(request):
    data = BusinessData.objects.all()
    context = {
        'total_revenue': data.aggregate(Sum('revenue'))['revenue__sum'],
        'best_performing_unit': data.values('unit').annotate(total_revenue=Sum('revenue')).order_by('-total_revenue').first(),
        'best_performing_vendor': data.values('vendor').annotate(total_revenue=Sum('revenue')).order_by('-total_revenue').first(),
        'upcoming_business': data.filter(date__gte=date.today()).order_by('date', 'time')
    }
    return render(request, 'overview.html', context)