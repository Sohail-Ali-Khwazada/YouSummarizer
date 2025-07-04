from flask import Flask, request, jsonify;
from genTranscript import genTranscript;
from sumTranscript import summarize_transcript;

app = Flask(__name__);

@app.route('/')
def home():
    return "YouTube Summary API is working!";

@app.route('/api/services/summary', methods=['POST'])
def summarize():
    data = request.get_json();
    video_url = data.get("video_url");


    if not video_url:
        return jsonify({"error": "Missing video_url"}), 400;

    transcript = genTranscript(video_url);

    if transcript.startswith("Error"):
        return jsonify({"error": transcript}), 500;

    summary = summarize_transcript(transcript);
    return jsonify({"summary": summary});

if __name__ == '__main__':
    app.run(debug=True, port=8080)