from app01.models import Business
from rest_framework import generics
from app01.serializers import BusinessSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .import road_prediction
from django.http import JsonResponse


class RegisterBusinessView(generics.CreateAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

def road_prediciton_view(request):
    if request.method == 'GET':
        try:
            # Local query for me but need to update to local table name
            query = 'SELECT * FROM busyness_score;'
            
            # Retrieve timestamp from query parameters
            timestamp_str = request.GET.get('timestamp', None)
            
            if timestamp_str:
                try:
                    target_datetime = pd.Timestamp(timestamp_str)
                except ValueError:
                    return HttpResponseBadRequest('Invalid timestamp format. Use ISO format.')
            else:
                target_datetime = pd.Timestamp.now()  # Use current timestamp if not provided
            
            # Replace with your actual PostgreSQL database credentials and configuration
            postgres_host = 'temp_placeholder_your_host'
            postgres_port = 'temp_placeholder_your_port'
            database_name = 'temp_placeholder_your_database'
            db_user = 'temp_placeholder_your_user'
            db_password = 'temp_placeholder_your_password'
            
            # Call the road_prediction function
            gdf = road_prediction.estimate_busyness(query, target_datetime, postgres_host, postgres_port, database_name, db_user, db_password)
            
            # Example JSON response (you can format it as needed)
            response_data = {
                'estimate': gdf.to_json(),
                'message': 'Estimation completed successfully.'
            }
            
            return JsonResponse(response_data)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    else:
        return HttpResponseBadRequest('Only GET method is allowed for this endpoint.')