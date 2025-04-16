import React from 'react';
import { 
  Upload, 
  BookOpen, 
  Target, 
  Rocket, 
  CheckCircle, 
  TrendingUp 
} from 'lucide-react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: Upload,
      title: "AI-Powered Resume Analysis",
      description: "Advanced parsing with SpaCy to extract comprehensive skills and experience. Intelligent extraction of technical and soft skills from your resume."
    },
    {
      icon: Target,
      title: "Precise Job Matching",
      description: "TF-IDF powered skill comparison for realistic job compatibility. Get an accurate match score that goes beyond simple keyword matching."
    },
    {
      icon: BookOpen,
      title: "Personalized Learning Path",
      description: "Targeted course recommendations to bridge skill gaps. Receive custom study plans from Udemy, Coursera, and other top learning platforms."
    }
  ];

  const workflowSteps = [
    {
      number: 1,
      icon: CheckCircle,
      title: "Enter Job Description",
      description: "Paste the job requirements for comprehensive analysis. Our AI understands the nuanced skills needed."
    },
    {
      number: 2,
      
      icon: Upload,
      title: "Upload Resume",
      description: "Easily upload PDF or DOCX files with a single click. Supports multiple resume formats."
    },
    {
      number: 3,
      icon: TrendingUp,
      title: "Get Instant Analysis",
      description: "Receive a detailed skill match report with percentage-based compatibility and insights."
    },
    {
      number: 4,
      icon: Rocket,
      title: "Personalized Study Plan",
      description: "Get a custom learning roadmap targeting your specific skill gaps. Accelerate your career growth."
    }
  ];

  return (
    <div className="features-container" id="features">
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                <feature.icon size={48} className="feature-icon" />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="workflow-section" id="how-it-works">
        <h2 className="section-title">Understanding the Workflow</h2>
        <div className="workflow-steps">
          {workflowSteps.map((step) => (
            <div key={step.number} className="workflow-step">
              <div className="step-number">{step.number}</div>
              <div className="step-icon-wrapper">
                <step.icon size={36} className="step-icon" />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;