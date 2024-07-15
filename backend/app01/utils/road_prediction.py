import time
import psycopg2
from shapely import wkb, wkt
import pandas as pd
import geopandas as gpd
from django.conf import settings

def connect_to_postgres(query):
    
    start_time = time.time()
    conn = None
    try:
        # Read the database info from settings.py in backend
        db_settings = settings.DATABASES['default']
        postgres_host = db_settings['HOST']
        postgres_port = db_settings['PORT']
        database_name = db_settings['NAME']
        db_user = db_settings['USER']
        db_password = db_settings['PASSWORD']

        # Connect to PostgreSQL
        conn = psycopg2.connect(
            database=database_name,
            user=db_user,
            password=db_password,
            host=postgres_host,
            port=postgres_port
        )
        print("PostgreSQL connection opened")

        cursor = conn.cursor()

        # Execute the query
        cursor.execute(query)
        print("Query executed successfully")

        # Fetch all rows from the executed query
        rows = cursor.fetchall()

        # Get column names from the cursor
        colnames = [desc[0] for desc in cursor.description]

        # Convert the result to a pandas DataFrame
        df = pd.DataFrame(rows, columns=colnames)

        return df

    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

    finally:
        # Closing the connection
        if conn:
            cursor.close()
            conn.close()
            print("PostgreSQL connection closed.")

    print(f'connect_to_postgres took {time.time() - start_time} seconds to complete')

def find_closest_rows(df, target_datetime):
    df['hour'] = pd.to_datetime(df['hour'])
    df['time_diff'] = abs(df['hour'] - target_datetime)
    df_sorted = df.sort_values(by=['zone', 'time_diff'])
    closest_rows = df_sorted.drop_duplicates(subset=['zone'], keep='first')
    closest_rows = closest_rows.drop(columns=['time_diff'])

    return closest_rows

def calculate_distance(geometry, closest_rows):
    x = [(geometry.distance(i)) ** 2 for i in closest_rows['centroid']]
    y = closest_rows['score']
    return sum(y / x)

def estimate_busyness(query, target_datetime):
    start_time = time.time()

    df = connect_to_postgres(query)
    df['centroid'] = df['centroid'].apply(wkb.loads)

    closest_rows = find_closest_rows(df, target_datetime)

    df2 = pd.read_csv('dataset/MHTN_zoned_streets.csv')
    df2 = df2.drop(columns=['address', 'zone_name', 'zone_geometry', 'zone_id'])
    df2['street_centroid'] = df2['street_centroid'].apply(wkt.loads)
    gdf = gpd.GeoDataFrame(df2, geometry='street_centroid')
    gdf['Score'] = gdf['street_centroid'].apply(calculate_distance, closest_rows=closest_rows) / 10 ** 5
    print(time.time() - start_time)

    return gdf[['Latitude', 'Longitude', 'Score']]
