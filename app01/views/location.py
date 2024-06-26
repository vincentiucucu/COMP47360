from django.shortcuts import render

def location(request):
    context = {
        'google_maps_api_key': ' '  # 替换为你的API密钥
    }
    return render(request, 'location.html', context)
