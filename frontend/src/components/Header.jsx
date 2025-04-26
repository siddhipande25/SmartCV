import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { HomeIcon, UploadIcon, BookOpenTextIcon, BarChartIcon } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  const handleAnalyzeResume = () => {
    navigate('/upload-resume');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
        <Link to="/" className="logo">
          <UploadIcon size={24} className="logo-icon" />
          <span>SmartCV Analyzer</span>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <HomeIcon size={16} className="nav-link-icon" />
            Home
          </Link>
          <Link to="/how-it-works" className="nav-link">
            <BookOpenTextIcon size={16} className="nav-link-icon" />
            How It Works
          </Link>
          <Link to="/features" className="nav-link">
            <BarChartIcon size={16} className="nav-link-icon" />
            Features
          </Link>
          <button 
            className="get-started-btn"
            onClick={handleAnalyzeResume}
          >
            Analyze My Resume
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;