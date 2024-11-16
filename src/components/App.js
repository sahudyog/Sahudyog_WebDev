import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate
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
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar is common for all routes */}

        {/* Define Routes */}
        <Routes>
          {/* Default Route: Main Page */}
          <Route
            path="/"
            element={
              <>
                <Navbar openLogin={openLogin} openSignup={openSignup} />
                <Hero />
                <TravelPackages />
                <CustomerReview />
                <Footer />
              </>
            }
          />

          {/* Route for HomePage */}
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/create-trip" element={<Createtrip />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/trip-details" element={<Tripdetails />} />
        </Routes>

        {/* Modals */}
        {showLogin && <Login closeModals={closeModals} openSignup={openSignup} />}
        {showSignup && <Signup closeModals={closeModals} openLogin={openLogin} />}
      </div>
    </Router>
  );
}

export default App;
