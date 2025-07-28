from youtube_transcript_api import YouTubeTranscriptApi

def format_timestamp(seconds):
    minutes = int(seconds // 60);
    secs = int(seconds % 60);
    return f"{minutes:02d}:{secs:02d}";

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

def genTranscript(video_url):
    try:
        video_id = video_url.split("v=")[1];
        transcript = YouTubeTranscriptApi.get_transcript(video_id);
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

        return {
            "transcript_text": transcript_text,
            "formatted_transcript": formatted_transcript
        };
    except Exception as e:
        return { "error": str(e) };









