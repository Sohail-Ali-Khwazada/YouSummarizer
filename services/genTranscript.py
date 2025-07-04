from youtube_transcript_api import YouTubeTranscriptApi

def genTranscript(video_url):
    try:
        
        video_id = video_url.split("v=")[1]
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        transcript_text = " ".join([entry["text"] for entry in transcript])
        return transcript_text
    
    except Exception as e:
        return f"Error: {e}"

# # Example: Get transcript of a YouTube video
# video_url = "https://www.youtube.com/watch?v=FjrJ2DJN_pA"
# transcript = get_youtube_transcript(video_url)



