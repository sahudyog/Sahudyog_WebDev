import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // Add your custom CSS file here
import './Createtrip';  // Import the CreateTrip component (if necessary, but it is not needed here since you’re using React Router for navigation)

const HomePage = ({ username }) => {
  return (
    <div className="homepage-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="website-name">
          <h1>vihaara.com</h1>
        </div>
        <div className="user-details">
          <span>Welcome, {username}</span>
        </div>
      </nav>

      {/* Sidebar Toggle */}
      <div className="sidebar">
        <ul>
          <li><a href="#">My Trips</a></li>
          <li><a href="#">Photos Upload</a></li>
          <li><a href="#">Local Guide Details</a></li>
          <li><a href="#">Community</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Welcome Message */}
        <h2>Welcome to Vihaara, {username}!</h2>

        {/* Create a Trip Button */}
        <Link to="/create-trip">
          <button className="create-trip-button">Create a Trip</button>
        </Link>

        {/* Recommended Trip Packages */}
        <div className="recommended-trips">
          <h3>Recommended Trip Packages</h3>
          <div className="trip-cards">
            <div className="trip-card">
              <img src="trip1.jpg" alt="Trip 1" />
              <h4>Beach Paradise</h4>
              <p>Enjoy a relaxing beach vacation with crystal-clear waters.</p>
            </div>
            <div className="trip-card">
              <img src="trip2.jpg" alt="Trip 2" />
              <h4>Mountain Adventure</h4>
              <p>Explore the high peaks and enjoy thrilling activities.</p>
            </div>
            <div className="trip-card">
              <img src="trip3.jpg" alt="Trip 3" />
              <h4>City Escape</h4>
              <p>Discover the vibrant culture and nightlife of the city.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
