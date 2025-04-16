import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Update if backend runs elsewhere

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${BASE_URL}/upload_resume`, formData);
  return response.data;
};

export const analyzeJobDescription = async (jobDescription) => {
  const response = await axios.post(`${BASE_URL}/analyze_job_description`, {
    job_description: jobDescription,
  });
  return response.data;
};

export const matchAndAnalyze = async (resumeData, jobDescriptionKeywords) => {
  const response = await axios.post(`${BASE_URL}/match_and_analyze`, {
    resume_data: resumeData,
    job_description_keywords: jobDescriptionKeywords,
  });
  return response.data;
};

export const generateStudyPlan = async (missingSkills) => {
  const response = await axios.post(`${BASE_URL}/generate_study_plan`, {
    missing_skills: missingSkills,
  });
  return response.data;
};


export const analyzeWithLLM = async (resumeText, jobDescription) => {
  const response = await axios.post(`${BASE_URL}/llm_analysis`, {
    resume_text: resumeText,
    job_description: jobDescription,
  });
  return response.data;
};
