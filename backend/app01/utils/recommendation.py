import pandas as pd
from geopy.distance import geodesic
from . import road_prediction

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
        (events_df['Start Date/Time'] <= user_datetime) & (events_df['End Date/Time'] >= user_datetime)]
    if valid_events.empty:
        return None
    return valid_events.loc[valid_events['Distance'].idxmin()]

def get_recommendations(events_df, user_zone, user_datetime):
    query = """select * from busyness_score"""
    events_df['Start Date/Time'] = pd.to_datetime(events_df['Start Date/Time'],format='mixed')
    events_df['End Date/Time'] = pd.to_datetime(events_df['End Date/Time'],format='mixed')
    relevant_areas = road_prediction.estimate_busyness(query, user_datetime).sort_values(by='Score', ascending=False).head(10)
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
