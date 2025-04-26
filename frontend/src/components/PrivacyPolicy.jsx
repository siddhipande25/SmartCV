import React from 'react';
import './Pages.css';

const PrivacyPolicy = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Privacy Policy</h1>
      </div>
      <div className="page-content">
        <section className="policy-section">
          <h2>1. Information We Process</h2>
          <p>SmartCV Analyzer processes resume information that you provide when using our services. This processing is done in real-time and the data is not stored on our servers.</p>
          
          <h3>1.1 Resume Data</h3>
          <p>When you upload your resume or CV, we process the content to provide you with insights and analysis. This processing occurs in your browser session and includes analyzing education details, work experience, skills, and other professional information.</p>
          
          <h3>1.2 Session Storage</h3>
          <p>Your resume data and analysis results are temporarily stored in your browser's session storage only. This data is automatically deleted when you close your browser or when the session expires. We do not use cookies or other persistent tracking mechanisms to store your information.</p>
        </section>

        <section className="policy-section">
          <h2>2. How We Use Your Information</h2>
          <p>We temporarily process your information to:</p>
          <ul>
            <li>Generate insights and analysis of your resume</li>
            <li>Display recommendations and improvements</li>
            <li>Provide the core functionality of our service</li>
          </ul>
          <p>Since we don't collect or store your data on our servers, your information is never used for marketing, advertising, or data mining purposes.</p>
        </section>

        <section className="policy-section">
          <h2>3. No Data Collection</h2>
          <p>SmartCV Analyzer does not create user accounts or collect personal information. We do not have a database of user information, and therefore do not share, sell, or transfer your data to any third parties.</p>
        </section>

        <section className="policy-section">
          <h2>4. Data Security</h2>
          <p>Your data security is ensured by the fact that your information never leaves your browser session. Our service is designed with a privacy-first approach, eliminating concerns about data breaches or unauthorized access to your personal information from our servers.</p>
        </section>

        <section className="policy-section">
          <h2>5. Analytics and Performance Monitoring</h2>
          <p>We may use anonymized and aggregated usage statistics to improve our service. These statistics do not contain any personally identifiable information and cannot be traced back to individual users.</p>
        </section>

        <section className="policy-section">
          <h2>6. Updates to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
          <p>Last Updated: April 24, 2025</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;