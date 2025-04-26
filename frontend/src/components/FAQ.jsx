import React, { useState } from 'react';
import './Pages.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is SmartCV Analyzer?",
      answer: "SmartCV Analyzer is an AI-powered tool that analyzes your resume or CV and provides insights and suggestions to improve it. It helps you optimize your resume for specific job applications and increases your chances of getting noticed by recruiters."
    },
    {
      question: "How does the CV analysis work?",
      answer: "Our system uses advanced natural language processing and machine learning algorithms to analyze your resume content. It identifies key strengths, weaknesses, and opportunities for improvement based on industry standards and job market trends."
    },
    {
      question: "Is my resume data secure?",
      answer: "Yes, we take data security very seriously. Your resume data is not stored on our servers and is only kept temporarily in your browser's session storage for the duration of your session. Once you close the browser or the session expires, your data is completely removed."
    },
    {
      question: "Do I need to create an account?",
      answer: "No, SmartCV Analyzer doesn't require account creation. You can use our service instantly without registration. Your analysis results are stored temporarily in your browser's session storage for your convenience during your session."
    },
    {
        question: "What file formats are supported for resume uploads?",
      answer: "We currently support PDF files only. In our next update, we plan to add support for DOCX, DOC, and TXT file formats. For best results, we recommend using PDF format as it preserves formatting better."
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "Our AI provides highly accurate insights based on current industry standards and recruitment practices. However, we recommend using the analysis as a guide rather than an absolute rule, as different industries and positions may have specific requirements."
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="page-content">
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <div 
                className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleAccordion(index)}
              >
                {item.question}
                <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;