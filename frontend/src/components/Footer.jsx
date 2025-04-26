import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { 
  LinkedinIcon, 
  TwitterIcon, 
  FacebookIcon, 
  InstagramIcon, 
  MailIcon 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>SmartCV Analyzer</h3>
            <p>Empowering your career journey with AI-driven insights</p>
          </div>

          <div className="footer-links-section">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                {/* Change <a> tags to <Link> components */}
                <li><Link to="/">Home</Link></li>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/how-it-works">How It Works</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service">Terms of Service</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
                <li><Link to="/feedback">Feedback</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-social">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              {/* These are external links, so keep as <a> tags */}
              <a href="https://www.linkedin.com/in/smartcv-analyzer-38a00a362/" className="social-icon"><LinkedinIcon size={24} /></a>
              <a href="#twitter" className="social-icon"><TwitterIcon size={24} /></a>
              <a href="#facebook" className="social-icon"><FacebookIcon size={24} /></a>
              <a href="#instagram" className="social-icon"><InstagramIcon size={24} /></a>
              <a href="smartcv.analyzer25@gmail.com" className="social-icon"><MailIcon size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;