from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from app01.models import Restriction
from app01.serializers import RestrictionSerializer

from django.http import JsonResponse, HttpResponseBadRequest
from datetime import datetime

from app01.utils.miscellaneous import to_nearest_hour


class RestrictionView(ListAPIView):
    serializer_class = RestrictionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            user_date = self.request.query_params.get('date')
            user_start_time = self.request.query_params.get('service_start_time')

            if not user_date and not user_start_time:
                return HttpResponseBadRequest('Service date and start time must be provided.')

            try:
                user_date = datetime.strptime(user_date, "%Y-%m-%d").date()
                user_start_time = datetime.strptime(user_start_time, "%H:%M:%S").time()
            except ValueError:
                return HttpResponseBadRequest('Invalid datetime format.')
            
            start_datetime = to_nearest_hour(datetime.combine(user_date, user_start_time))
            weekday = start_datetime.strftime('%A')



        except Exception as e:
            return JsonResponse({'Error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Restriction.objects.filter()