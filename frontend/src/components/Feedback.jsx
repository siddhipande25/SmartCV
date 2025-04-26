import React, { useState } from 'react';
import './Pages.css';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    feedbackType: '',
    comment: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Prepare data for submission
    const submissionData = {
      ...formData,
      rating: rating
    };
    
    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xqaqknbb', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });
      
      if (response.ok) {
        // Form submission was successful
        console.log('Feedback submitted successfully:', submissionData);
        setSubmitted(true);
        
        // Reset form after submission
        setTimeout(() => {
          setRating(0);
          setFormData({
            feedbackType: '',
            comment: ''
          });
          setSubmitted(false);
        }, 3000);
      } else {
        // Handle server errors
        console.error('Form submission failed');
        alert('There was a problem submitting your feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was a problem connecting to our server. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Feedback</h1>
      </div>
      <div className="page-content">
        <div className="feedback-container">
          <div className="feedback-intro">
            <h2>Help Us Improve</h2>
            <p>Your feedback is valuable to us. Please share your experience with SmartCV Analyzer to help us improve our services.</p>
          </div>
          
          {submitted ? (
            <div className="form-success">
              <h3>Thank you for your feedback!</h3>
              <p>We appreciate your input as we work to improve our services.</p>
            </div>
          ) : (
            <form className="feedback-form" onSubmit={handleSubmit}>
              <div className="form-group rating-group">
                <label>How would you rate your experience?</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star}
                      className={`star ${rating >= star ? 'active' : ''}`}
                      onClick={() => handleRatingClick(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <input type="hidden" name="rating" value={rating} />
              </div>
              
              <div className="form-group">
                <label htmlFor="feedbackType">What type of feedback do you have?</label>
                <select 
                  id="feedbackType" 
                  name="feedbackType"
                  value={formData.feedbackType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="issue">Issue or Problem</option>
                  <option value="compliment">Compliment</option>
                  <option value="feature">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="comment">Comments</label>
                <textarea 
                  id="comment" 
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows="5" 
                  required
                  placeholder="Please share your thoughts, suggestions, or experiences..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;