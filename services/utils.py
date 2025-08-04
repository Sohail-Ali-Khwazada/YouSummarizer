def chunkingConfig(text):
    text_length = len(text)
    if text_length < 3000:
      return 2000, 200
    elif text_length < 10000:
      return 4000, 500
    elif text_length < 20000:
      return 6000, 800
    else:
      return 8000, 1000
    
def clean_json_string(response):
    return response.strip().removeprefix("```json").removesuffix("```").strip()
  

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