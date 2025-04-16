import React from 'react';
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
                <li><a href="/">Home</a></li>
                <li><a href="/features">Features</a></li>
                <li><a href="/how-it-works">How It Works</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#disclaimer">Disclaimer</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#feedback">Feedback</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-social">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <a href="#linkedin" className="social-icon"><LinkedinIcon size={24} /></a>
              <a href="#twitter" className="social-icon"><TwitterIcon size={24} /></a>
              <a href="#facebook" className="social-icon"><FacebookIcon size={24} /></a>
              <a href="#instagram" className="social-icon"><InstagramIcon size={24} /></a>
              <a href="#email" className="social-icon"><MailIcon size={24} /></a>
            </div>
          </div>
        </div>

       
      </div>
    </footer>
  );
};

export default Footer;