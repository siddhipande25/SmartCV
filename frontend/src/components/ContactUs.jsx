import React, { useState } from 'react';
import './Pages.css';
import contactImage from '../assets/contact.png';


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('https://formspree.io/f/mgvkedkb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitted(true);
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        const responseData = await response.json();
        throw new Error(responseData.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Contact Us</h1>
      </div>
      <div className="page-content">
        <div className="contact-container">
          <div className="contact-image">
          <img 
            src={contactImage} 
            alt="SmartCV Analyzer Resume Analysis" 
            className="contact-illustration"
          />

            <h2>We'd Love to Hear From You</h2>
            <p>Send us a message and we'll respond as soon as possible.</p>
          </div>
          
          <div className="contact-form-container">
            {submitted ? (
              <div className="form-success">
                <h3>Thank you for your message!</h3>
                <p>We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {error && (
                  <div className="form-error">
                    <p>{error}</p>
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5" 
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-button" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;