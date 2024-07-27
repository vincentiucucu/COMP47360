import pandas as pd
import geopandas as gpd
import numpy as np
from shapely.wkt import loads
from ..models import Event
from django.db.models import Q
from .busyness_estimation import estimate_busyness
import time

def get_events(service_start, service_end):
        
    events = list(Event.objects.filter(Q(start__range=(service_start, service_end)) | Q(end__range=(service_start, service_end))).values())

    for event in events:
        event['location'] = event['location'].wkt

    events_df = pd.DataFrame(events)
    events_df['location'] = events_df['location'].apply(loads)

    events_gdf = gpd.GeoDataFrame(events_df, geometry='location')

    if events_gdf.crs is None:
        events_gdf = events_gdf.set_crs('EPSG:4326')

    return events_gdf


def calculate_min_distance(streets_gdf, events_gdf):

    if streets_gdf.crs != events_gdf.crs:
        events_gdf = events_gdf.to_crs(streets_gdf.crs)

    min_distances = []
    for street in streets_gdf.geometry:
        distances = events_gdf.geometry.distance(street)
        min_distances.append(distances.min())

    streets_gdf['min_distance_to_event'] = min_distances

    return streets_gdf


def generate_recommendations(service_start, service_mid, service_end, zone, count=None):

    start_time = time.time()

    events = get_events(service_start, service_end)
    streets = estimate_busyness(service_mid, zone=zone).to_crs('EPSG:4326')

    recommendations = calculate_min_distance(streets, events)
    recommendations.sort_values(['score', 'min_distance_to_event'], ascending=[False, False], inplace=True)

    print('Execution time: ', time.time() - start_time)

    if count:
        return recommendations.head(count)
    else:
        return recommendations
