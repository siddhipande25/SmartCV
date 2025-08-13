# AI-Powered Resume Evaluator & Study Plan Generator
A React-based application that uses Large Language Models (LLMs) to analyze resumes against job descriptions, calculate a match score, highlight missing skills, and generate a personalized study plan — all without a traditional backend.

🚀 Features
Resume Analysis

Upload your resume (PDF/text format) and paste the job description.

LLM extracts skills, compares them, and generates a match score.

Skill Gap Detection

Identifies missing skills based on the job requirements.

AI-Powered Study Plan

Creates a personalized learning roadmap with suggested resources.

Frontend-Only Architecture

All requests go directly from the React app to the LLM API (no custom backend).

🛠️ Tech Stack
Frontend: React.js, HTML, CSS, JavaScript

LLM API: OpenAI API (or your chosen LLM provider)

File Handling: Browser-based PDF parsing with pdf.js

State Management: React Hooks / Context API

⚙️ How It Works
User uploads resume and enters job description in the React app.

Resume content is extracted in-browser using pdf.js.

The extracted text and job description are sent to the LLM API.

LLM analyzes the content and returns:

Resume Match Score (%)

Matched Skills

Missing Skills

Suggested Study Plan

Results are displayed instantly in the UI.

📸 Screenshots
(Add images of your upload screen, analysis results, and generated study plan here.)

📌 Example Output
yaml
Copy
Edit
Resume Match Score: 82%
Matched Skills: Java, Python, SQL
Missing Skills: AWS, Kubernetes, Data Visualization

Study Plan:
1. AWS Cloud Fundamentals – [AWS Training Link]
2. Kubernetes Basics – [FreeCodeCamp]
3. Data Visualization with Python – [Kaggle Course]
📦 Installation & Usage
bash
Copy
Edit
# Clone this repo
git clone https://github.com/yourusername/SmartCV.git

# Move into the project folder
cd SmartCV

# Install dependencies
npm install

# Add your LLM API key in .env file
REACT_APP_API_KEY=your_api_key_here

# Start the development server
npm start
🌟 Future Enhancements
Support for multiple job descriptions comparison.

Downloadable PDF report of the analysis & study plan.

Integration with LinkedIn for auto-importing skills.

🤝 Contributing
Contributions are welcome! Fork this repo, make changes, and submit a pull request.
