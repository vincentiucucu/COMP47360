import time
import psycopg2
from shapely import wkb,wkt
import pandas as pd 
import geopandas as gpd


def connect_to_postgres(query, postgres_host, postgres_port, database_name, db_user , db_password):
    start_time = time.time()
    
    conn = None
    try:
        # Connect to PostgreSQL
        conn = psycopg2.connect(
            database=database_name,
            user=db_user,
            password=db_password,
            host=postgres_host,
            port=postgres_port
        )
        print("PostgreSQL connection opened")
        
        # Create a cursor object
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
    
#     df = df.merge(taxi_zone, left_on='zone', right_on='location_id', how='left')
#     df = df.drop(columns = ['location_id'])


    # Ensure 'hour' is datetime
    df['hour'] = pd.to_datetime(df['hour'])
    
    # Calculate the absolute difference between each 'hour' and the target_datetime
    df['time_diff'] = abs(df['hour'] - target_datetime)
    
    # Sort by zone and then by the time difference
    df_sorted = df.sort_values(by=['zone', 'time_diff'])
    
    # Drop duplicates to keep the row with the smallest time difference for each zone
    closest_rows = df_sorted.drop_duplicates(subset=['zone'], keep='first')
    
    # Drop the temporary 'time_diff' column
    closest_rows = closest_rows.drop(columns=['time_diff'])
    
    return closest_rows

def calculate_distance(geometry, closest_rows):
    x = [(geometry.distance(i))**2 for i in closest_rows['centroid']]
    y = closest_rows['score']
    
    return sum(y/x)

def estimate_busyness(query, target_datetime, postgres_host, postgres_port, database_name, db_user, db_password):
    start_time = time.time()

    df = connect_to_postgres(query, postgres_host, postgres_port, database_name, db_user, db_password)
    df['centroid'] = df['centroid'].apply(wkb.loads)

    closest_rows = find_closest_rows(df, target_datetime)
    
    df2 = pd.read_csv('/Users/brianmcmahon/Downloads/MHTN_zoned_streets.csv')
    df2 = df2.drop(columns = ['address','zone_name','zone_geometry','zone_id'])#,'street_geometry'
    df2['street_centroid'] = df2['street_centroid'].apply(wkt.loads)
    gdf = gpd.GeoDataFrame(df2, geometry='street_centroid')
    gdf['estimate'] = gdf['street_centroid'].apply(calculate_distance, closest_rows = closest_rows)/10**5
    print(time.time() - start_time)
    return gdf