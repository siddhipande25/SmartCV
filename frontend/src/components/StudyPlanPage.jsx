import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudyPlanPage.css';

const StudyPlanPage = () => {
  const navigate = useNavigate();
  const [studyPlan, setStudyPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load study plan from session storage
    try {
      const savedStudyPlan = JSON.parse(sessionStorage.getItem('studyPlan'));
      
      if (!savedStudyPlan) {
        setError('Study plan data not found. Please complete the previous steps first.');
        setIsLoading(false);
        return;
      }
      
      setStudyPlan(savedStudyPlan);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading study plan:', err);
      setError('Failed to load study plan. Please try again.');
      setIsLoading(false);
    }
  }, []);

  const handleDownloadPlan = () => {
    // Create a text version of the study plan
    if (!studyPlan) return;
    
    let planText = "PERSONALIZED STUDY PLAN\n\n";
    
    planText += `Total Duration: ${studyPlan.total_duration || "N/A"}\n`;
    planText += `Total Courses: ${studyPlan.courses ? studyPlan.courses.length : 0}\n\n`;
    
    planText += "RECOMMENDED COURSES:\n\n";
    
    if (studyPlan.courses && studyPlan.courses.length > 0) {
      studyPlan.courses.forEach((course, index) => {
        planText += `${index + 1}. ${course.title}\n`;
        planText += `   Skill: ${course.skill}\n`;
        planText += `   Provider: ${course.provider}\n`;
        planText += `   Duration: ${course.duration}\n`;
        planText += `   Level: ${course.level}\n`;
        planText += `   URL: ${course.url || "Not provided"}\n\n`;
      });
    }
    
    // Create blob and download link
    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'study_plan.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Return loading state
  if (isLoading) {
    return (
      <div className="study-plan-container loading">
        <div className="loading-indicator">
          Loading study plan...
        </div>
      </div>
    );
  }

  // Return error state
  if (error) {
    return (
      <div className="study-plan-container error">
        <div className="error-message">
          {error}
          <button onClick={() => navigate('/result-analysis')}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="study-plan-container">
      <div className="page-header">
        <h1>Personalized Study Plan</h1>
      </div>

      <div className="study-plan-content">
        <div className="courses-section">
          <div className="courses-card">
            <h2>Recommended Courses</h2>
            {studyPlan && studyPlan.courses && studyPlan.courses.length > 0 ? (
              studyPlan.courses.map((course, index) => (
                <div className="course-item" key={index}>
                  <div className="course-header">
                    <span className="course-tag">{course.skill}</span>
                    <h3>{course.title}</h3>
                    {course.url && (
                      <button 
                        className="external-link-btn"
                        onClick={() => window.open(course.url, '_blank')}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="course-details">
                    <div className="course-detail-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                      <span>{course.provider}</span>
                    </div>
                    <div className="course-detail-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>{course.duration}</span>
                    </div>
                    <div className="course-detail-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 15l-3-3m0 0l3-3m-3 3h12.75"></path>
                      </svg>
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-courses-message">
                No courses available in the study plan
              </div>
            )}
          </div>
        </div>

        <div className="sidebar">
          <div className="summary-card">
            <h2>Study Plan Summary</h2>
            <div className="summary-details">
              <div className="summary-item">
                <span>Total Duration</span>
                <span>{studyPlan?.total_duration || 'N/A'}</span>
              </div>
              <div className="summary-item">
                <span>Courses</span>
                <span>{studyPlan?.courses?.length || 0} courses</span>
              </div>
              <div className="summary-item">
                <span>Skills Covered</span>
                <span>{studyPlan?.skills_covered || 0} skills</span>
              </div>
              <button className="download-plan-btn" onClick={handleDownloadPlan}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanPage;