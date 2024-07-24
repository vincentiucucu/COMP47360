import time
# import psycopg2
from shapely import wkb, wkt
import pandas as pd
import geopandas as gpd
from django.conf import settings
import os
from ..models import ZoneBusynessScore,StreetBusynessScore
from datetime import datetime, timedelta
# import csv

def connect_to_postgres(query=None):
    """
    Connect to the database using Django ORM and return a pandas DataFrame.
    If a query is provided, it will be used to filter the results.
    """
    #split query up into seperate bits to generate filter.  This could be done using regex.  Would be safer for future release
    x = query[:11]
    y = query[12:31]
    z = query[32:]

    filters = {x: (y,z)}
    # If a query is provided, use it to filter the results
    if query:
        # Assuming the query is a Django ORM filter query in string form
        # e.g., "score__gt=5" to filter scores greater than 5
        #should currently always be using this if
        busyness_scores = ZoneBusynessScore.objects.filter(**filters)
        
    elif query ==1:#dont run this lol
        print("connect to db precalculated table")
        busyness_scores = StreetBusynessScore.objects.all()

    else:
        # print("else")
        # Otherwise, return all records
        busyness_scores = ZoneBusynessScore.objects.all()
        # print(busyness_scores)

    rows = list(busyness_scores.values())
    for row in rows:
        if 'centroid' in row and row['centroid']:
            row['centroid'] = row['centroid'].wkt  # Convert the PointField to WKT format

    # Convert the list of dictionaries to a pandas DataFrame
    df = pd.DataFrame(rows)

    return df

def connect_to_postgres_precalc(query=None):
    """
    Connect to the database using Django ORM and return a pandas DataFrame.
    If a query is provided, it will be used to filter the results.
    """
    #split query up into seperate bits to generate filter.  This could be done using regex.  Would be safer for future release
    x = query[:11]
    y = query[12:31]
    z = query[32:]

    filters = {x: (y,z)}
    # If a query is provided, use it to filter the results
    if query:
        # Assuming the query is a Django ORM filter query in string form
        # e.g., "score__gt=5" to filter scores greater than 5
        #should currently always be using this if
        busyness_scores = StreetBusynessScore.objects.filter(**filters)
    else:
        df = pd.DataFrame()

    rows = list(busyness_scores.values())
    for row in rows:
        if 'centroid' in row and row['centroid']:
            row['centroid'] = row['centroid'].wkt  # Convert the PointField to WKT format

    # Convert the list of dictionaries to a pandas DataFrame
    df = pd.DataFrame(rows)

    return df

def find_closest_rows(df, target_datetime):
    
    df['hour'] = pd.to_datetime(df['hour'])
    df['time_diff'] = abs(df['hour'] - target_datetime)
    df_sorted = df.sort_values(by=['zone', 'time_diff'])
    closest_rows = df_sorted.drop_duplicates(subset=['zone'], keep='first')
    closest_rows = closest_rows.drop(columns=['time_diff'])

    return closest_rows

def find_closest_rows_precalc(df, target_datetime):
    
    df['hour'] = pd.to_datetime(df['hour'])
    df['time_diff'] = abs(df['hour'] - target_datetime)
    df_sorted = df.sort_values(by=['time_diff'])
    closest_rows = df_sorted.drop_duplicates(subset=['centroid'], keep='first')
    closest_rows = closest_rows.drop(columns=['time_diff'])

    return closest_rows

def calculate_distance(geometry, closest_rows):
    
    x = [(geometry.distance(i)) ** 2 for i in closest_rows['centroid']]
    y = closest_rows['score']
    return sum(y / x)

def min_max_scale(scores, new_min=0, new_max=10):
    min_score = min(scores)
    max_score = max(scores)
    scaled_scores = [(new_max - new_min) * (score - min_score) / (max_score - min_score) + new_min for score in scores]
    return scaled_scores

def estimate_busyness(query, target_datetime):
    query = f'hour__range={target_datetime-timedelta(hours=2)},{target_datetime+timedelta(hours=2)}'
    start_time = time.time()

# Open a connection to database using models.py and pull busyness_score
    t2 = time.time()
    comparison_string = '2024-05-16 22:00:00'

# Convert the string to a datetime object
    comparison_datetime = datetime.strptime(comparison_string, '%Y-%m-%d %H:%M:%S')
    #Remove false in below if to add functionality to precalced table however at the moment is slower than pulling and calc
    if target_datetime<comparison_datetime and False:
        df = connect_to_postgres_precalc(query)
        print('precalc',len(df))
        closest_rows = find_closest_rows_precalc(df, target_datetime)
        print('precalc',len(closest_rows))
        print('Total_Time:', start_time- time.time())
        return closest_rows
    else:
        df = connect_to_postgres(query)
    df['centroid'] = df['centroid'].apply(wkt.loads)
    print('Time to; connect db:',time.time() - t2)


# Find the rows in the database return with the closest datetime stamp
    t2 = time.time()
    closest_rows = find_closest_rows(df, target_datetime)
    print('Time to; find timestamp:',time.time() - t2)

# Load list of street centroids
    t2 = time.time()
    csv_path = os.path.join(os.path.dirname(__file__), 'dataset', 'MHTN_zoned_streets.csv')
    df2 = pd.read_csv(csv_path)
    df2 = df2.drop(columns=['address', 'zone_name', 'zone_geometry'])
    df2['street_centroid'] = df2['street_centroid'].apply(wkt.loads)
    gdf = gpd.GeoDataFrame(df2, geometry='street_centroid')
    print('Time to; load streets:',time.time() - t2)


# Calculate score for street centroids
    t2 = time.time()

    gdf['Score'] = gdf['street_centroid'].apply(calculate_distance, closest_rows=closest_rows) / 10 ** 5
    gdf['Score'] = min_max_scale(gdf['Score'], new_min=0, new_max=10)

    print('Time to; calculate scores:',time.time() - t2)

    print('Time to; Total Time:',time.time() - start_time)
    print(len(gdf))
    
    return gdf
