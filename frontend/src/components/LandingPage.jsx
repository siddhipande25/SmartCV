import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { Upload, AlignVerticalSpaceAround, BookOpen } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h2>Optimize Your Resume with AI</h2>
          <p>
            Get instant feedback on your resume, match it with job descriptions, and receive
            personalized study plans to boost your chances of landing your dream job.
          </p>
          <button 
            className="cta-button"
            onClick={() => navigate('/upload-resume')}
          >
            Start Analyzing Now
          </button>
        </div>
      </div>

      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <Upload size={48} className="feature-icon" />
            <h3>Easy Resume Upload</h3>
            <p>Simply upload your resume in PDF or DOCX format and get instant analysis.</p>
          </div>
          <div className="feature-card">
            <AlignVerticalSpaceAround size={48} className="feature-icon" />
            <h3>Smart Matching</h3>
            <p>AI-powered analysis to match your skills with job requirements.</p>
          </div>
          <div className="feature-card">
            <BookOpen size={48} className="feature-icon" />
            <h3>Personalized Study Plans</h3>
            <p>Get customized learning recommendations to fill skill gaps.</p>
          </div>
        </div>
      </div>

      <div className="workflow-section">
        <h2>System Overview</h2>
        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <p>Enter job description</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">2</div>
            
            <p>Upload your resume</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">3</div>
            <p>Get instant analysis</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">4</div>
            <p>Receive study plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
