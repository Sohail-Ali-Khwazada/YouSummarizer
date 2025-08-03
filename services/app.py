from flask import Flask, request, jsonify;
from getVideoDetails import getVideoDetails;
from sumTranscript import sumTranscript;
from chat import update_vector_store, ask_question

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

    result  = getVideoDetails(video_url);

    if "error" in result:
        return jsonify({"error": result["error"]}), 500;

    title = result["title"];
    transcript_text = result["transcript_text"];
    formatted_transcript = result["formatted_transcript"];

    summary = sumTranscript(transcript_text);

    # update_vector_store(transcript_text);

    return jsonify({
            "title":title,
            "transcript":formatted_transcript,
            "summary": summary
        });
    
@app.route('/api/update-vector-store', methods=['POST'])
def update_vector():
    data = request.get_json()
    transcript_text = data.get("transcript_text")

    if not transcript_text:
        return jsonify({"error": "Missing transcript_text"}), 400

    try:
        update_vector_store(transcript_text)
        return jsonify({"message": "Vector store updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/api/chat', methods=['POST'])
def chat_with_video():
    data = request.get_json()
    question = data.get("question")

    if not question:
        return jsonify({"error": "Missing question"}), 400

    try:
        answer = ask_question(question)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)