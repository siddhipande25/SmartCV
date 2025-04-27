import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudyPlanPage.css';
import axios from 'axios';

const StudyPlanPage = () => {
  const navigate = useNavigate();
  const [introText, setIntroText] = useState('');
  const [courses, setCourses] = useState([]);
  const [rawText, setRawText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudyPlan = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/study-plan",
          {
            analysisResult: JSON.parse(sessionStorage.getItem('analysisResult'))
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = response.data;
        setRawText(data);
        parseStudyPlan(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching study plan:', err);
        setError('Failed to fetch study plan. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchStudyPlan();
  }, []);

  const parseStudyPlan = (text) => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l !== '');

    let intro = '';
    const courseLines = [];

    let section = 'intro';

    for (let line of lines) {
      if (line.match(/^\d+\.\s+/) && section === 'intro') {
        section = 'courses';
      }

      if (section === 'intro') {
        intro += line + ' ';
      } else if (section === 'courses') {
        courseLines.push(line);
      }
    }

    // Convert links in intro to clickable format
    intro = intro.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

    const parsedCourses = courseLines.map(line => {
      const match = line.match(/^\d+\.\s*(.*?)\s*-\s*(https?:\/\/[^\s]+)$/);
      if (match) {
        return {
          title: match[1].trim(),
          url: match[2].trim(),
          description: '',
        };
      } else {
        return {
          title: line,
          url: '',
          description: '',
        };
      }
    });

    setIntroText(intro.trim());
    setCourses(parsedCourses);
  };

  const handleDownloadPlan = () => {
    const blob = new Blob([rawText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'study_plan.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="study-plan-container loading">
        <div className="loader"></div>
        <p>Loading your personalized study plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="study-plan-container error">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/result-analysis')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="study-plan-container">
      <h1>Personalized Study Plan</h1>

      <div className="intro-text">
        <p dangerouslySetInnerHTML={{ __html: introText }} />
      </div>

      <div className="courses-card">
        <h2>Recommended Courses</h2>
        {courses.map((course, i) => (
          <div key={i} className="course-item">
            <h3>{course.title}</h3>
            {course.description && <p>{course.description}</p>}
            {course.url && (
              <a href={course.url} target="_blank" rel="noopener noreferrer">
                Go to Course
              </a>
            )}
          </div>
        ))}
      </div>

      <button className="download-plan-btn" onClick={handleDownloadPlan}>
        Download Full Plan
      </button>
    </div>
  );
};

export default StudyPlanPage;
