import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import CustomerReview from './CustomerReview';
import TravelPackages from './TravelPackages';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import HomePage from './HomePage';
import Createtrip from './Createtrip';
import Tripdetails from './Tripdetails';
import MyTrips from './MyTrips';
import PhotosUpload from './Photos';
import LocalGuides from './LocalGuides';
// import Community from './Community';
import Dashboard from './Dashboard';
import GuideSignup from './GuideSignup';
import './App.css';
// import { UserProvider } from './context/UserContext';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showGuideSignup, setShowGuideSignup] = useState(false); // Added state for GuideSignup modal

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
    setShowGuideSignup(false); // Close GuideSignup modal when Login is opened
  };

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
    setShowGuideSignup(false); // Close GuideSignup modal when Signup is opened
  };

  const openGuideSignup = () => {
    setShowGuideSignup(true); // Open GuideSignup modal
    setShowLogin(false); // Close Login modal if opened
    setShowSignup(false); // Close Signup modal if opened
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowGuideSignup(false); // Close all modals
  };

  return (
    <Router>
      <div className="App">
        {/* Define Routes */}
        <Routes>
          {/* Main Landing Page */}
          <Route
            path="/"
            element={
              <>
                <Navbar openLogin={openLogin} openSignup={openSignup} openGuideSignup={openGuideSignup} />
                <Hero />
                <TravelPackages />
                <CustomerReview />
                <Footer />
              </>
            }
          />

          {/* Dashboard with Sidebar */}
          <Route path="/HomePage" element={<HomePage username="User" />}>
            <Route path="dashboard" element={<Dashboard username="User" />} />
            <Route path="my-trips" element={<MyTrips />} />
            <Route path="photos-upload" element={<PhotosUpload />} />
            <Route path="local-guides" element={<LocalGuides />} />
            {/* <Route path="community" element={<Community />} /> */}
          </Route>

          {/* Other Routes */}
          <Route path="/create-trip" element={<Createtrip />} />
          <Route path="/trip-details" element={<Tripdetails />} />
          <Route path="/Login" element={<Login />} />
        </Routes>

        {/* Modals */}
        {showLogin && <Login closeModals={closeModals} openSignup={openSignup} />}
        {showSignup && <Signup closeModals={closeModals} openLogin={openLogin} />}
        {showGuideSignup && <GuideSignup closeModals={closeModals} />} {/* GuideSignup modal */}
      </div>
    </Router>
  );
}

export default App;