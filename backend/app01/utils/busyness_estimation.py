import pandas as pd
import geopandas as gpd
import numpy as np
from shapely.wkt import loads
from ..models import ZoneBusynessScore, ZonedStreet
import time

def get_zones_scores(target_datetime):
    
    zones_scores = list(ZoneBusynessScore.objects.filter(hour=target_datetime).values())

    for zone in zones_scores:
        zone['centroid'] = zone['centroid'].wkt

    zones_scores_df = pd.DataFrame(zones_scores)
    zones_scores_df['centroid'] = zones_scores_df['centroid'].apply(loads)

    return zones_scores_df


def get_zoned_streets(zone=None):

    if zone:
        zoned_streets = list(ZonedStreet.objects.filter(zone_id=zone).values('street_address', 'street_centroid'))
    else:
        zoned_streets = list(ZonedStreet.objects.values('street_centroid'))

    for street in zoned_streets:
        street['street_centroid'] = street['street_centroid'].wkt

    zoned_streets_df = pd.DataFrame(zoned_streets)
    zoned_streets_df['street_centroid'] = zoned_streets_df['street_centroid'].apply(loads)

    zoned_streets_gdf = gpd.GeoDataFrame(zoned_streets_df, geometry='street_centroid')

    if zoned_streets_gdf.crs is None:
        zoned_streets_gdf = zoned_streets_gdf.set_crs('EPSG:4326')

    return zoned_streets_gdf


def calculate_scores(geometry, zones_scores_df):
    
    distances = geometry.distance(zones_scores_df['centroid'])
    squared_distances = distances ** 2
    scores = zones_scores_df['score']
    return np.sum(scores / squared_distances)


def scale_scores(scores, new_min=0, new_max=10):

    min_score = min(scores)
    max_score = max(scores)

    scaled_scores = [(new_max - new_min) * (score - min_score) / (max_score - min_score) + new_min for score in scores]
    return scaled_scores


def estimate_busyness(target_datetime, zone=None):

    start_time = time.time()

    zones_scores = get_zones_scores(target_datetime)
    zoned_streets = get_zoned_streets(zone)

    # closest_records = get_closest_records(zones_scores, target_datetime)

    zoned_streets['score'] = zoned_streets['street_centroid'].apply(lambda geom: calculate_scores(geom, zones_scores)) / 10 ** 5
    zoned_streets['score'] = scale_scores(zoned_streets['score'], new_min=0, new_max=10)

    print("Execution time: ", time.time() - start_time)

    return zoned_streets



