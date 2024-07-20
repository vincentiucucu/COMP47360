import pandas as pd
from geopy.distance import geodesic
from . import road_prediction
from ..models import Event
import re


def extract_lat_lng(point_str):
    match = re.search(r'\((-?\d+\.\d+)\s(-?\d+\.\d+)\)', point_str)
    if match:
        return pd.Series({'lat': float(match.group(2)), 'lng': float(match.group(1))})
    else:
        return pd.Series({'lat': None, 'lng': None})

# Apply the function to 'centroid' column


def connect_to_postgres(query=None):
    """
    Connect to the database using Django ORM and return a pandas DataFrame.
    If a query is provided, it will be used to filter the results.
    """

    # If a query is provided, use it to filter the results
    if query:
        # Assuming the query is a Django ORM filter query in string form
        # e.g., "score__gt=5" to filter scores greater than 5
        filters = {key: value for key, value in [item.split('=') for item in query.split(',')]}
        event_list = Event.objects.filter(**filters)
    else:
        # print("else")
        # Otherwise, return all records
        event_list = Event.objects.all()
        # print(busyness_scores)

    rows = list(event_list.values())
    for row in rows:
        if 'location' in row and row['location']:
            row['location'] = row['location'].wkt  # Convert the PointField to WKT format

    # Convert the list of dictionaries to a pandas DataFrame
    df = pd.DataFrame(rows)
    # df['location']
    # df['lat'] = df['location'].str[6:]
    df[['Latitude', 'Longitude']] = df['location'].apply(extract_lat_lng)
    print(df)
    return df

def parse_event_datetime(dt_str):
    formats = ["%Y-%m-%dT%H:%M:%S.%f", "%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S"]
    for fmt in formats:
        try:
            return pd.to_datetime(dt_str, format=fmt)
        except ValueError:
            continue
    raise ValueError(f"Unable to parse datetime string: {dt_str}")

def find_nearest_event(events_df, location_lat, location_lng, user_datetime):
    events_df['Distance'] = events_df.apply(
        lambda row: geodesic((location_lat, location_lng), (row['Latitude'], row['Longitude'])).meters,
        axis=1
    )
    valid_events = events_df[
        # (events_df['Start Date/Time'] <= user_datetime) & (events_df['End Date/Time'] >= user_datetime)]
        (events_df['start'] <= user_datetime) & (events_df['end'] >= user_datetime)]
    if valid_events.empty:
        return None
    return valid_events.loc[valid_events['Distance'].idxmin()]

def get_recommendations(events_df, user_zone, user_datetime,head):
    events_df = connect_to_postgres(query=None)
    query = None
    # events_df['Start Date/Time'] = pd.to_datetime(events_df['Start Date/Time'],format='mixed')
    # events_df['End Date/Time'] = pd.to_datetime(events_df['End Date/Time'],format='mixed')
    events_df['start'] = pd.to_datetime(events_df['start'],format='mixed')
    events_df['end'] = pd.to_datetime(events_df['end'],format='mixed')
    estimate = road_prediction.estimate_busyness(query, user_datetime)
    # print(estimate[estimate['zone_id']==4])
    # print('user_zone',user_zone)
    if head == 'all':
        relevant_areas = estimate[estimate['zone_id']==int(user_zone)].sort_values(by='Score', ascending=False)
    else:
        relevant_areas = estimate[estimate['zone_id']==int(user_zone)].sort_values(by='Score', ascending=False).head(int(head))
    print(relevant_areas)
    if relevant_areas.empty:
        return pd.DataFrame()

    recommendations = relevant_areas.apply(
        lambda row: pd.Series({
            'Latitude': row['street_centroid'].y,
            'Longitude': row['street_centroid'].x,
            'Zone': user_zone,
            'Score': row['Score'],
            'DistanceToEvent': find_nearest_event(events_df, row['street_centroid'].y, row['street_centroid'].x, user_datetime)['Distance'] if find_nearest_event(events_df, row['street_centroid'].y, row['street_centroid'].x, user_datetime) is not None else float('inf')
        }),
        axis=1
    )

    recommendations = recommendations.sort_values(by='Score', ascending=False)

    return recommendations
