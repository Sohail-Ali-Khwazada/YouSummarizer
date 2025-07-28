from flask import Flask, request, jsonify;
from genTranscript import genTranscript;
from sumTranscript import summarize_transcript;

app = Flask(__name__);

@app.route('/')
def home():
    return "YouTube Summary API is working!";

@app.route('/api/get-video-details', methods=['POST'])
def videoData():
    data = request.get_json();
    video_url = data.get("video_url");


    if not video_url:
        return jsonify({"error": "Missing video_url"}), 400;

    result  = genTranscript(video_url);

    if "error" in result:
        return jsonify({"error": result["error"]}), 500;

    transcript_text = result["transcript_text"];
    formatted_transcript = result["formatted_transcript"];

    summary = summarize_transcript(transcript_text);
    return jsonify({"transcript":formatted_transcript,"summary": summary});

if __name__ == '__main__':
    app.run(debug=True, port=8080)