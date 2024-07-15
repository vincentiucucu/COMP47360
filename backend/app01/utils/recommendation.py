import pandas as pd
from geopy.distance import geodesic


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

def get_recommendations(busy_score_data, events_df, user_zone, user_datetime):
    relevant_areas = busy_score_data

    if relevant_areas.empty:
        return pd.DataFrame()

    recommendations = relevant_areas.apply(
        lambda row: pd.Series({
            'Latitude': row['Latitude'],
            'Longitude': row['Longitude'],
            'Zone': user_zone,
            'Score': row['Score'],
            'DistanceToEvent': find_nearest_event(events_df, row['Latitude'], row['Longitude'], user_datetime)['Distance'] if find_nearest_event(events_df, row['Latitude'], row['Longitude'], user_datetime) is not None else float('inf')
        }),
        axis=1
    )

    recommendations = recommendations.sort_values(by='Score', ascending=False)

    return recommendations
