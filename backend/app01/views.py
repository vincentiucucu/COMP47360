from app01.models import Business
from rest_framework import generics
from app01.serializers import BusinessSerializer
from rest_framework.permissions import AllowAny
from .utils import road_prediction
from django.http import JsonResponse, HttpResponseBadRequest
from datetime import datetime
import pandas as pd
from .utils.recommendation import get_recommendations, parse_event_datetime
from .utils.road_prediction import estimate_busyness
import os

class RegisterBusinessView(generics.CreateAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

# Load event data into a global variable
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

events_df = pd.read_csv(os.path.join(BASE_DIR, 'app01', 'utils', 'dataset', 'combined_nyc_events.csv'))
events_df['Start Date/Time'] = events_df['Start Date/Time'].apply(parse_event_datetime)
events_df['End Date/Time'] = events_df['End Date/Time'].apply(parse_event_datetime)

def get_busyness_scores(request):
    if request.method == 'GET':
        try:
            user_datetime_str = request.GET.get('datetime')

            if not user_datetime_str:
                return HttpResponseBadRequest('Datetime must be provided.')

            try:
                user_datetime = datetime.strptime(user_datetime_str, "%Y-%m-%d %H:%M:%S")
            except ValueError:
                return HttpResponseBadRequest('Invalid datetime format. Use "%Y-%m-%d %H:%M:%S".')

            # Query to get busyness score
            query = None#'SELECT * FROM busyness_score;'

            # Estimate busyness
            busy_score_data = estimate_busyness(query, user_datetime)

            return JsonResponse(busy_score_data.to_json(), safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return HttpResponseBadRequest('Only GET method is allowed for this endpoint.')

def get_recommendations_view(request):
    if request.method == 'GET':
        try:
            user_zone = request.GET.get('zone')
            user_datetime_str = request.GET.get('datetime')
            head = request.GET.get('head')

            if not user_zone or not user_datetime_str:
                return HttpResponseBadRequest('Zone and datetime must be provided.')

            try:
                user_datetime = datetime.strptime(user_datetime_str, "%Y-%m-%d %H:%M:%S")
            except ValueError:
                return HttpResponseBadRequest('Invalid datetime format. Use "%Y-%m-%d %H:%M:%S".')

            # # Get busyness info from frontend
            # busy_score_data_json = request.GET.get('busy_score_data')
            # if not busy_score_data_json:
            #     return HttpResponseBadRequest('Busy score data must be provided.')
            # busy_score_data = pd.read_json(busy_score_data_json)

            # Generate recommendations
            recommendations = get_recommendations(events_df, user_zone, user_datetime,head)

            return JsonResponse(recommendations.to_dict(orient='records'), safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return HttpResponseBadRequest('Only GET method is allowed for this endpoint.')
