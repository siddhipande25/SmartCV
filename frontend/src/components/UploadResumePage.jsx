import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  CheckCircle,
  Loader2,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import axios from "axios";
import "./UploadResumePage.css";

const UploadResumePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const navigate = useNavigate();

  // Load saved data when component mounts
  useEffect(() => {
    // Restore job description from session storage
    const savedJobDescription = sessionStorage.getItem("jobDescription");
    if (savedJobDescription) setJobDescription(savedJobDescription);
    
    // Restore analysis results if available
    const savedAnalysisResult = sessionStorage.getItem("analysisResult");
    if (savedAnalysisResult) {
      try {
        const parsedResult = JSON.parse(savedAnalysisResult);
        setAnalysisResult(parsedResult);
        setAnalysisComplete(true);
      } catch (err) {
        console.error("Error parsing saved analysis result:", err);
      }
    }

    // Check if we have a saved file in session storage
    const hasResumeFile = sessionStorage.getItem("hasResumeFile") === "true";
    if (hasResumeFile) {
      // We can't directly store File objects in session storage,
      // so we'll display a message instead
      setSelectedFile({ name: sessionStorage.getItem("resumeFileName") || "Saved file" });
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ["pdf", "docx", "txt"];
    const fileExt = file.name.split(".").pop().toLowerCase();
    if (!validTypes.includes(fileExt)) {
      setError("Invalid file type. Please upload PDF, DOCX, or TXT only.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10MB.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
    setAnalysisResult(null);
    setAnalysisComplete(false);
    
    // Save file info to session storage
    sessionStorage.setItem("hasResumeFile", "true");
    sessionStorage.setItem("resumeFileName", file.name);
    
    // Reset any previous analysis
    sessionStorage.removeItem("analysisResult");
  };

  const handleTextareaChange = (event) => {
    const jd = event.target.value;
    setJobDescription(jd);
    sessionStorage.setItem("jobDescription", jd);
    setAnalysisResult(null);
    setAnalysisComplete(false);
    
    // Reset any previous analysis
    sessionStorage.removeItem("analysisResult");
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJobDescription(text);
      sessionStorage.setItem("jobDescription", text);
      setAnalysisResult(null);
      setAnalysisComplete(false);
      
      // Reset any previous analysis
      sessionStorage.removeItem("analysisResult");
    } catch (err) {
      alert("Unable to access clipboard. Please paste manually.");
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragLeave = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    handleFileChange({ target: { files: e.dataTransfer.files } });
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !(selectedFile instanceof File)) {
      setError("Please upload a valid resume file.");
      return;
    }

    if (jobDescription.trim() === "") {
      setError("Please enter a job description");
      return;
    }

    setIsLoading(true);
    setError(null);
    setUploadProgress(0);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const resumeResponse = await axios.post(
        "http://127.0.0.1:8000/siddhu",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            setUploadProgress(percent);
          },
        }
      );

      const resumeData = resumeResponse.data;

      const analysisResponse = await axios.post(
        "http://127.0.0.1:8000/job-description",
        {
          job_des: jobDescription,
          file_url: resumeData.file_url,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      console.log("Analysis Response:", analysisResponse.data);
      const resultData = analysisResponse.data || "No response from server";
      
      setAnalysisResult(resultData);
      setAnalysisComplete(true);
      
      // Save analysis result to session storage
      sessionStorage.setItem("analysisResult", JSON.stringify(resultData));
      
    } catch (err) {
      console.error(err);
      setError("Failed to process. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateStudyPlan = () => {
    navigate("/study-plan");
  };
  
  const handleClearAll = () => {
    // Clear all state
    setSelectedFile(null);
    setPreviewUrl(null);
    setJobDescription("");
    setAnalysisResult(null);
    setAnalysisComplete(false);
    setError(null);
    
    // Clear session storage
    sessionStorage.removeItem("jobDescription");
    sessionStorage.removeItem("hasResumeFile");
    sessionStorage.removeItem("resumeFileName");
    sessionStorage.removeItem("analysisResult");
  };

  return (
    <div className="upload-page">
      <div className="page-header">
        <h1>Resume Match Analysis</h1>
        <p className="header-subtitle">
          Upload your resume and job description to find your match score and
          skill gaps
        </p>
      </div>

      <div className="content-container">
        {/* Job Description Section */}
        <div className="upload-section job-description-section">
          <div className="section-header">
            <h2>
              <span className="step-badge">1</span>Enter Job Description
            </h2>
          </div>

          <div className="card job-description-card">
            <div className="job-description-header">
              <h3>Job Description</h3>
              <div className="header-actions">
                <button
                  className="action-button clipboard-btn"
                  onClick={handlePasteFromClipboard}
                  disabled={isLoading}
                >
                  Paste from Clipboard
                </button>
              </div>
            </div>

            <textarea
              className="job-description-textarea"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={handleTextareaChange}
              disabled={isLoading}
            ></textarea>

            <div className="character-count">
              {jobDescription.length} characters
            </div>
          </div>

          <div className="card info-card">
            <h3 className="info-card-title">
              <CheckCircle size={20} /> Tips for Job Description
            </h3>
            <ul className="info-list">
              <li>Include the complete job description</li>
              <li>Don't remove technical requirements</li>
              <li>Keep formatting (bullet points, lists)</li>
            </ul>
          </div>
        </div>

        {/* Resume Upload Section */}
        <div className="upload-section resume-upload-section">
          <div className="section-header">
            <h2>
              <span className="step-badge">2</span>Upload Your Resume
            </h2>
          </div>

          <div
            className={`upload-container ${isLoading ? "uploading" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="file-upload-area">
              <div className="upload-icon">
                <Upload size={48} />
              </div>
              <h3 className="upload-title">Upload your resume</h3>
              <p className="upload-description">
                Drag and drop your resume here, or click to browse
              </p>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                className="file-input"
                onChange={handleFileChange}
                id="resume-upload"
                disabled={isLoading}
              />
              <label
                htmlFor="resume-upload"
                className={`action-button browse-btn ${
                  isLoading ? "disabled" : ""
                }`}
              >
                Browse Files
              </label>

              {selectedFile && (
                <div className="selected-file-info">
                  <FileText size={16} />
                  <p>Selected: {selectedFile.name}</p>
                  {selectedFile.size && (
                    <span className="file-size">
                      ({(selectedFile.size / 1024).toFixed(2)} KB)
                    </span>
                  )}
                  {sessionStorage.getItem("hasResumeFile") === "true" && !selectedFile.size && (
                    <span className="persistent-file-note">
                      (Saved from previous session)
                    </span>
                  )}
                </div>
              )}

              {previewUrl && selectedFile?.name?.endsWith(".pdf") && (
                <div className="pdf-preview">
                  <embed
                    src={previewUrl}
                    type="application/pdf"
                    width="100%"
                    height="300px"
                  />
                </div>
              )}
            </div>

            <div className="card info-card">
              <h4 className="info-card-title">
                <FileText size={20} /> Supported File Types
              </h4>
              <ul className="info-list">
                <li>PDF files (recommended)</li>
                <li>Microsoft Word documents (.docx)</li>
                <li>Plain text files (.txt)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="action-section">
        {isLoading && (
          <div className="loading-overlay">
            <Loader2 className="animate-spin" size={48} />
            <p>Processing your request...</p>
            {uploadProgress > 0 && (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <span>{uploadProgress}%</span>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <div className="buttons-container">
          <button
            className="primary-button analyze-btn"
            onClick={handleAnalyze}
            disabled={
              isLoading || jobDescription.trim().length === 0 || !selectedFile
            }
          >
            {isLoading ? "Processing..." : "Analyze Resume Match"}
          </button>

          {(analysisComplete || sessionStorage.getItem("analysisResult")) && (
            <button
              className="primary-button study-plan-btn"
              onClick={handleGenerateStudyPlan}
            >
              <BookOpen size={20} />
              Generate Study Plan
            </button>
          )}
          
          <button 
            className="secondary-button clear-btn"
            onClick={handleClearAll}
          >
            Clear All Data
          </button>
        </div>
        
        {/* Updated Analysis Result Section */}
        {analysisResult && (
          <div className="analysis-result">
            <h2>Analysis Results</h2>
            <div className="result-card">
              {/* Match Score */}
              {analysisResult.match_score && (
                <div className="result-section match-score">
                  <h3>Match Score</h3>
                  <div className="score-display">
                    <div className="score-circle">
                      {analysisResult.match_score}
                    </div>
                  </div>
                </div>
              )}

              {/* Skills Container - Side by Side Layout */}
              <div className="result-section">
                <h3>Skills Analysis</h3>
                <div className="skills-container">
                  {/* Matched Skills */}
                  <div className="matched-skills">
                    <h4>Matched Skills</h4>
                    {analysisResult.matched_skills?.length > 0 ? (
                      <ul className="skills-list">
                        {analysisResult.matched_skills.map((skill, index) => (
                          <li
                            key={`matched-${index}`}
                            className="skill-item matched"
                          >
                            <CheckCircle size={16} />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No matched skills found</p>
                    )}
                  </div>

                  {/* Missing Skills */}
                  <div className="missing-skills">
                    <h4>Missing Skills</h4>
                    {analysisResult.missing_skills?.length > 0 ? (
                      <ul className="skills-list">
                        {analysisResult.missing_skills.map((skill, index) => (
                          <li
                            key={`missing-${index}`}
                            className="skill-item missing"
                          >
                            <AlertCircle size={16} />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No skill gaps found</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              {analysisResult.recommendations?.length > 0 && (
                <div className="result-section recommendations">
                  <h3>Recommendations</h3>
                  <ul className="recommendations-list">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={`rec-${index}`} className="recommendation-item">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Summary */}
              {analysisResult.summary && (
                <div className="result-section summary">
                  <h3>Summary</h3>
                  <p>{analysisResult.summary}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadResumePage;