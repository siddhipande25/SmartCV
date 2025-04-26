// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // Import components
// import Header from './components/Header';
// import LandingPage from './components/LandingPage';
// import HowItWorks from './components/HowItWorks';
// import Features from './components/FeaturesSection';
// import Footer from './components/Footer';
// import UploadResumePage from './components/UploadResumePage';
// import StudyPlanPage from './components/StudyPlanPage';



// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <Routes>
//           {/* Main Routes */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/home" element={<LandingPage />} />

//           {/* Feature and Workflow Routes */}
//           <Route path="/how-it-works" element={<HowItWorks />} />
//           <Route path="/features" element={<Features />} />

//           {/* Resume Upload Route */}
//           <Route path="/upload-resume" element={<UploadResumePage />} />

//           {/* Study Plan Route */}
//           <Route path="/study-plan" element={<StudyPlanPage />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import HowItWorks from './components/HowItWorks';
import Features from './components/FeaturesSection';
import Footer from './components/Footer';
import UploadResumePage from './components/UploadResumePage';
import StudyPlanPage from './components/StudyPlanPage';
import FAQ from './components/FAQ';
import ContactUs from './components/ContactUs';
import Feedback from './components/Feedback';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />

          {/* Feature and Workflow Routes */}
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/features" element={<Features />} />

          {/* Resume Upload Route */}
          <Route path="/upload-resume" element={<UploadResumePage />} />

          {/* Study Plan Route */}
          <Route path="/study-plan" element={<StudyPlanPage />} />
          
          {/* Footer linked pages */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
