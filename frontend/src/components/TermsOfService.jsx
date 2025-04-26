import React from 'react';
import './Pages.css';

const TermsOfService = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Terms of Service</h1>
      </div>
      <div className="page-content">
        <section className="policy-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using SmartCV Analyzer services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.</p>
        </section>

        <section className="policy-section">
          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily use our services for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained on SmartCV Analyzer</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. Data Handling</h2>
          <p>SmartCV Analyzer does not store your resume data on our servers. Your data is temporarily stored in your browser's session storage only for the duration of your active session. This data is automatically deleted when you close your browser or when the session expires. We do not create user accounts or permanently store any personal information.</p>
        </section>

        <section className="policy-section">
          <h2>4. Disclaimer</h2>
          <p>The materials on SmartCV Analyzer are provided on an 'as is' basis. SmartCV Analyzer makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </section>

        <section className="policy-section">
          <h2>5. Limitations</h2>
          <p>In no event shall SmartCV Analyzer or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our services, even if SmartCV Analyzer or a SmartCV Analyzer authorized representative has been notified orally or in writing of the possibility of such damage.</p>
        </section>

        <section className="policy-section">
          <h2>6. Revisions and Errata</h2>
          <p>The materials appearing on SmartCV Analyzer could include technical, typographical, or photographic errors. SmartCV Analyzer does not warrant that any of the materials on its website are accurate, complete or current. SmartCV Analyzer may make changes to the materials contained on its website at any time without notice.</p>
          <p>Last Updated: April 24, 2025</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;