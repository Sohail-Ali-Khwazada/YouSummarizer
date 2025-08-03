import os;
import requests;
from youtube_transcript_api import YouTubeTranscriptApi;
from dotenv import load_dotenv;

load_dotenv();

def format_timestamp(seconds):
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    return f"{hours:02d}:{minutes:02d}:{secs:02d}"

def groupTranscript(transcript, interval):
    grouped = []
    current_group = {"start": None, "text": ""}
    group_start = 0

    for entry in transcript:
        start_time = entry["start"]
        text = entry["text"]

        if current_group["start"] is None:
            current_group["start"] = start_time
            group_start = start_time

        if start_time < group_start + interval:
            current_group["text"] += (" " if current_group["text"] else "") + text
        else:
            grouped.append(current_group)
            current_group = {
                "start": start_time,
                "text": text
            }
            group_start = start_time

    if current_group["text"]:
        grouped.append(current_group)
        
    return grouped

# https://www.googleapis.com/youtube/v3/videos?part=snippet&id=dQw4w9WgXcQ&key=API_KEY
def getTitle(video_id):
    api_key = os.getenv("GOOGLE_API_KEY");
    url = "https://www.googleapis.com/youtube/v3/videos";
    params = {
        "part": "snippet",
        "id": video_id,
        "key": api_key
    };

    try:
        response = requests.get(url, params=params);
        data = response.json();

        if "items" in data and len(data["items"]) > 0:
            return data["items"][0]["snippet"]["title"];
        else:
            return "Unknown Title";
    except Exception as e:
        return { "error": str(e) };
    

def getVideoDetails(video_url):
    try:
        video_id = video_url.split("v=")[1];
        # transcript = YouTubeTranscriptApi.get_transcript(video_id);
        fetched_transcript = YouTubeTranscriptApi().fetch(video_id, languages=['en'])
        transcript = fetched_transcript.to_raw_data()
        grouped_transcript = groupTranscript(transcript,30);

        formatted_transcript = [];
        transcript_text_parts = [];

        for entry in grouped_transcript:
            transcript_text_parts.append(entry["text"]);
            formatted_transcript.append({
                "timestamp": format_timestamp(entry["start"]),
                "text": entry["text"]
            });

        transcript_text = " ".join(transcript_text_parts);
        title = getTitle(video_id);

        if "error" in title:
            return {"error": title["error"]};
    
        return {
            "title": title,
            "transcript_text": transcript_text,
            "formatted_transcript": formatted_transcript
        };
    except Exception as e:
        return { "error": str(e) };
