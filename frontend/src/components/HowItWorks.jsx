import React from 'react';
import { 
  Upload, 
  CheckCircle, 
  TrendingUp, 
  Rocket 
} from 'lucide-react';
import './HowItWorks.css';

const HowItWorks = () => {
  const workflowSteps = [
    {
      number: 1,
      icon: CheckCircle,
      title: "Enter Job Description",
      description: "Paste the job requirements for comprehensive analysis. Our AI understands the nuanced skills needed.",
      color: "#10B981"
    },
    {
      number: 2,
     
      icon: Upload,
      title: "Upload Resume",
      description: "Easily upload PDF or DOCX files with a single click. Supports multiple resume formats.",
      color: "#3B82F6"
      
    },
    {
      number: 3,
      icon: TrendingUp,
      title: "Get Instant Analysis",
      description: "Receive a detailed skill match report with percentage-based compatibility and insights.",
      color: "#8B5CF6"
    },
    {
      number: 4,
      icon: Rocket,
      title: "Personalized Study Plan",
      description: "Get a custom learning roadmap targeting your specific skill gaps. Accelerate your career growth.",
      color: "#F43F5E"
    }
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <h3 className="section-title">How SmartCV Analyzer Works</h3>
        <div className="workflow-steps">
          {workflowSteps.map((step) => (
            <div 
              key={step.number} 
              className="workflow-step"
              style={{ 
                '--step-color': step.color,
                '--step-color-light': `${step.color}1A` 
              }}
            >
              <div className="step-badge">
                <span className="step-number">{step.number}</span>
              </div>
              <div 
                className="step-icon-wrapper"
                style={{ backgroundColor: `${step.color}1A` }}
              >
                <step.icon 
                  size={36} 
                  color={step.color} 
                  className="step-icon" 
                />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;