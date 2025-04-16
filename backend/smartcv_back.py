import requests
import os
import re
import fitz  # PyMuPDF
import json
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
from groq import Groq

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
API_KEY_LLAMA = "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"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def get_direct_download_url(drive_url):
    match = re.search(r'/d/([a-zA-Z0-9_-]+)', drive_url)
    if not match:
        raise ValueError("Invalid Google Drive URL")
    file_id = match.group(1)
    return f"https://drive.google.com/uc?export=download&id={file_id}"


def input_pdf(file_source):
    try:
        if "drive.google.com" in file_source:
            file_source = get_direct_download_url(file_source)

        if file_source.startswith("http://") or file_source.startswith("https://"):
            response = requests.get(file_source)
            response.raise_for_status()
            doc = fitz.open(stream=response.content, filetype="pdf")
        else:
            if not os.path.exists(file_source):
                raise FileNotFoundError("Local file not found.")
            doc = fitz.open(file_source)

        text = ""
        for page in doc:
            text += page.get_text()

        if not text.strip():
            raise ValueError("No text found in the PDF.")

        return [{
            "mime_type": "text/plain",
            "data": text
        }]
    except Exception as e:
        raise ValueError(f"Failed to process PDF: {str(e)}")
predined_3 = """
# You will be provided with job description and resume your task is to suggest some courses to the candidate based on the job description and resume.
# Please provide the courses in a JSON format with course name and link.
# """
def generate_llama_response2(prompt, pdf_content, query):
    full_prompt = f"""
    job description: {prompt}
    pdf_content: {pdf_content}
    query: {query}
    """
    client = Groq(api_key=API_KEY_LLAMA)
    response = client.chat.completions.create(
        messages=[{"role": "user", "content": full_prompt}],
        model="llama3-8b-8192",
    )
    return response.choices[0].message.content

def generate_llama_response(prompt, pdf_content, query):
    full_prompt = f"""
You are an intelligent Applicant Tracking System (ATS) that evaluates resumes based on job descriptions.
Your job is to compare the resume content with the job description and provide a JSON-formatted response with the following keys:
- match_score (string with % sign)
- matched_skills (list of strings)
- missing_skills (list of strings)
- recommendations (list of strings)
- summary (string)

Make sure your response is strictly in JSON format. Do not include any markdown formatting or explanation.

job description: {prompt}
resume content: {pdf_content["data"]}
query: {query}
    """
    client = Groq(api_key=API_KEY_LLAMA)
    response = client.chat.completions.create(
        messages=[{"role": "user", "content": full_prompt}],
        model="llama3-8b-8192",
    )
    content = response.choices[0].message.content

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        raise ValueError("Model response was not valid JSON: " + content)


@app.route('/chat1', methods=['POST'])
def chat1():
    data = request.get_json()
    prompt = data.get("job_des")
    file_url = data.get("file_url")

    if not file_url or not prompt:
        return jsonify({"error": "Missing 'prompt' or 'file_url' in request."}), 400

    try:
        pdf_content = input_pdf(file_url)
        response = generate_llama_response(prompt, pdf_content[0], prompt)
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/job-description', methods=['POST'])
def job():
    data = request.get_json()
    prompt = data.get("job_des")
    file_url = data.get("file_url")

    if not file_url or not prompt:
        return jsonify({"error": "Missing 'prompt' or 'file_url' in request."}), 400

    try:
        pdf_content = input_pdf(file_url)
        response = generate_llama_response(prompt, pdf_content[0], prompt)
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    prompt = data.get("job_des")
    file_url = data.get("file_url")

    if not file_url or not prompt:
        return jsonify({"error": "Missing 'prompt' or 'file_url' in request."}), 400

    try:
        pdf_content = input_pdf(file_url)
        response = generate_llama_response(prompt, pdf_content[0], prompt)
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/study-plan', methods=['POST'])
def study():
    data = request.get_json()
    prompt = data.get("job_des")
    file_url = data.get("file_url")

    if not file_url or not prompt:
        return jsonify({"error": "Missing 'prompt' or 'file_url' in request."}), 400

    try:
        pdf_content = input_pdf(file_url)
        response = generate_llama_response2(prompt, pdf_content[0], predined_3 )
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/siddhu', methods=['POST'])
def siddhu():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        return jsonify({
            'message': 'File uploaded successfully',
            'file_url': f'http://127.0.0.1:8000/uploads/{filename}'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


if __name__ == '__main__':
    app.run(debug=True, port=8000)






















