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
API_KEY_LLAMA = 'Enter Your API Key'
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
 You will be provided with analysis result and predefined prompt your task is to suggest some courses to the candidate based on result suggest related content to the links given below .Kindly do mention below links also
Sr. No. 	Course Name 	Course Link 
1.	Python for Beginners: Master Python Programming - https://www.udemy.com/course/python-for-beginners-2021/ 
2.	The Complete Python Bootcamp From Zero to Hero in Python - https://www.udemy.com/course/complete-python-bootcamp/
3.	AI Programming with Python Nanodegree - https://www.udacity.com/course/ai-programming-python-nanodegree--nd089
4.	The Complete JavaScript Course 2024 - https://www.udemy.com/course/the-complete-javascript-course/
5.	React - The Complete Guide - https://www.udemy.com/course/react-the-complete-guide-incl-redux/
6.	Mastering Data Structures & Algorithms using C and C++ - https://www.udemy.com/course/datastructurescncpp/
7.	Java Programming Masterclass covering Java 11 & Java 17 - https://www.udemy.com/course/java-the-complete-java-developer-course/   
8.	Java Programming and Object-Oriented Design - https://www.udemy.com/course/java-programming-and-object-oriented-design/
9.	SQL Bootcamp 2024: Go from Zero to Hero (SQL) - https://www.udemy.com/course/the-complete-sql-bootcamp/ 
10.	Tableau Desktop 2024: Master Data Visualization - https://www.udemy.com/course/tableau-desktop-specialist-certification-training/
11.	The Complete SQL Bootcamp 2024: Go from Zero to Hero (SQL) - https://www.udemy.com/course/the-complete-sql-bootcamp/
12.	AWS Certified Cloud Practitioner CLF-C02 - https://www.udemy.com/course/aws-certified-cloud-practitioner-clf-c02-new-2023/ 
13.	AWS Cloud Practitioner Essentials - https://www.udemy.com/course/aws-cloud-practitioner-essentials/
14.	AWS Certified Solutions Architect Associate SAA-C03 - https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/   
15.	Google Cloud Platform (GCP) Associate Cloud Engineer Certification - https://www.udemy.com/course/google-cloud-platform-associate-cloud-engineer-certification/  
16.	Google Cloud Certified Professional Cloud Architect - https://www.udemy.com/course/google-cloud-certified-professional-cloud-architect/
17.	Embedded Systems Bare-Metal Programming Ground Up™ (ARM®) - https://www.udemy.com/course/embedded-systems-bare-metal-programming/ 
18.	IoT Fundamentals for Beginners - https://www.udemy.com/course/iot-fundamentals/
19.	Digital Signal Processing (DSP) using MATLAB - https://www.udemy.com/course/digital-signal-processing-dsp-using-matlab/
20.	Circuit Analysis - https://www.udemy.com/course/circuit-analysis/
21.	Control Systems Engineering - https://www.udemy.com/course/control-systems-engineering/
22.	Thermodynamics - Thermodynamics Course - https://www.udemy.com/course/thermodynamics/
23.	Mechanics of Materials I - Fundamentals of Stress & Strain and Axial Loading - Mechanics of Materials Part 1 - https://www.udemy.com/course/mechanics-of-materials-part-1/
24.	Introduction to Mechatronics - https://www.udemy.com/course/introduction-to-mechatronics/ 
25.	Arduino Step by Step: Your complete guide - https://www.udemy.com/course/arduino-step-by-step-your-complete-guide/
26.	Fluid Mechanics 101 - https://www.udemy.com/course/fluid-mechanics-101/
27.	Heat Transfer Fundamentals - https://www.udemy.com/course/heat-transfer-fundamentals/
28.	Engineering Mechanics For Dummies - https://www.udemy.com/course/engineering-mechanics-for-dummies/ 
29.	Engineering Statics - Learn with Problems - https://www.udemy.com/course/engineering-statics/
30.	Statics and Dynamics - Engineering Statics - Learn with Problems - https://www.udemy.com/course/engineering-statics/
31.	Additive Manufacturing / 3D Printing - https://www.udemy.com/course/3d-printing/
32.	AutoCAD : 2D and 3D: https://www.udemy.com/course/autocad-2020-for-designers-a-problem-solving-approach/?couponCode=IND21PM
33.	MEP Drafting Projects Course - https://www.udemy.com/course/mep-drafting-projects-course/?couponCode=IND21PM\
34.	AutoCAD Masterclass - https://www.udemy.com/course/autocad-2024-from-zero-to-advanced-full-course/?couponCode=IND21PM
35.	Artificial Intelligence and Machine Learning Fundamentals - https://www.udemy.com/course/artificial-intelligence-and-machine-learning-fundamentals/?couponCode=IND21PM
36.	The Complete Machine Learning Course: Zero to Expert - https://www.udemy.com/course/the-complete-machine-learning-course-from-zero-to-expert/?couponCode=IND21PM
37.	Artificial Intelligence Courses on edX - https://www.edx.org/learn/artificial-intelligence
38.	Machine Learning Courses on edX - https://www.edx.org/learn/machine-learning
39.	Artificial Intelligence Training - https://www.linkedin.com/learning/topics/artificial-intelligence
40.	Machine Learning Training - https://www.linkedin.com/learning/topics/machine-learning
41.	The Complete Cryptocurrency Course (5-in-1) - https://www.udemy.com/course/cryptocurrency/?couponCode=IND21PM
42.	The Complete Cryptocurrency & Bitcoin Trading Course 2025 - https://www.udemy.com/course/the-complete-cryptocurrency-trading-course/?couponCode=IND21PM
43.	Cryptocurrency Learning Hub - https://www.edx.org/learn/cryptocurrency
44.	Bitcoin and Cryptocurrencies (UC Berkeley) - https://www.edx.org/learn/bitcoin/university-of-california-berkeley-bitcoin-and-cryptocurrencies
45.	Cryptocurrency Training - https://www.linkedin.com/learning/topics/cryptocurrency




"""
def generate_llama_response2(result, predefined):
    full_prompt = f"""
    analysis_result: {result}
   
    predfined_prompt: {predefined}
    """
    client = Groq(api_key=API_KEY_LLAMA)
    response = client.chat.completions.create(
        messages=[{"role": "user", "content": full_prompt}],
        model="llama3-8b-8192",
        temperature=0.3,
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
        print("PDF Content:", pdf_content[0])
        print("Prompt:", prompt)
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
    result = data.get("analysisResult")

   
    try:
        response = generate_llama_response2(result, predined_3 )
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






















