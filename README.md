# 📄 AI-Powered Resume Evaluator & Study Plan Generator  

A **React-based application** that uses **Large Language Models (LLMs)** to analyze resumes against job descriptions, calculate a **match score**, highlight **missing skills**, and generate a **personalized study plan** — all **without a traditional backend**.

---

## 🚀 Features  
✅ **Resume Analysis** – Upload your resume & paste a job description for instant analysis.  
✅ **Match Score Calculation** – LLM-powered percentage match between resume & job description.  
✅ **Skill Gap Detection** – Highlights missing skills for the target role.  
✅ **Personalized Study Plan** – Generates a learning roadmap with recommended resources.  
✅ **Frontend-Only Architecture** – All processing is done via LLM API calls from the React app.  

---

## 🛠️ Tech Stack  
- **Frontend:** React.js, HTML, CSS, JavaScript  
- **AI API:** OpenAI API (or any preferred LLM API)  
- **PDF Parsing:** `pdf.js` (browser-based)  
- **State Management:** React Hooks / Context API  

---

## ⚙️ How It Works  
1. **Upload Resume** – User uploads their resume (PDF/text).  
2. **Extract Text** – Resume content is read in-browser via `pdf.js`.  
3. **LLM Processing** – Resume & job description are sent to LLM API.  
4. **Analysis Output** – LLM returns:
   - Match Score (%)
   - Matched Skills
   - Missing Skills
   - Study Plan with learning resources  
5. **Display Results** – React app renders results in an easy-to-read format.  

---

## 📌 Example Output 
Resume Match Score: 82%
Matched Skills: Java, Python, SQL
Missing Skills: AWS, Kubernetes, Data Visualization

Study Plan:

1.AWS Cloud Fundamentals – [AWS Training Link]
2.Kubernetes Basics – [FreeCodeCamp]
3.Data Visualization with Python – [Kaggle Course]

---

## 📦 Installation & Usage  
```bash
# Clone the repository
git clone https://github.com/yourusername/SmartCV.git

# Move into the project folder
cd SmartCV

# Install dependencies
npm install

# Create a .env file & add your LLM API key
REACT_APP_API_KEY=your_api_key_here

# Start the development server
npm start

---

## 🌟 Future Enhancements  
- 🔄 **Multiple JD Comparison** – Compare your resume with more than one job description at a time.  
- 📄 **Downloadable PDF Report** – Export the evaluation results and study plan as a PDF file.  
- 🔗 **LinkedIn Integration** – Auto-import your LinkedIn profile skills for analysis.  

---

## 🤝 Contributing  
We welcome contributions from the community!  
Here’s how you can contribute:  
1. **Fork** the repository.  
2. **Create** a new branch (`feature-new` or `fix-bug`).  
3. **Commit** your changes with clear messages.  
4. **Push** to your branch.  
5. Open a **Pull Request** describing your updates.  

---




