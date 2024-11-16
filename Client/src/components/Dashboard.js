import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-page">
      <h2>Welcome to Vihaara,</h2>

      {/* Create a Trip Button */}
      <Link to="/create-trip">
        <button className="create-trip-button">Create a Trip</button>
      </Link>
    
      {/* Recommended Trip Packages */}
      <div className="recommended-trips">
        <h3>Recommended Trip Packages</h3>
        <div className="trip-cards">
          <div className="trip-card">
            <img src="https://media.istockphoto.com/id/610041376/photo/beautiful-sunrise-over-the-sea.jpg?s=612x612&w=0&k=20&c=R3Tcc6HKc1ixPrBc7qXvXFCicm8jLMMlT99MfmchLNA=" alt="Trip 1" />
            <h4>Beach Paradise</h4>
            <p>Enjoy a relaxing beach vacation with crystal-clear waters.</p>
          </div>
          <div className="trip-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiFevKxJrbPBVlILYjNXA_sRs0uv3wx57e7w&s" alt="Trip 2" />
            <h4>Mountain Adventure</h4>
            <p>Explore the high peaks and enjoy thrilling activities.</p>
          </div>
          <div className="trip-card">
            <img src="https://hbr.org/resources/images/article_assets/2016/01/04-Cities-Looking-to-Harness-Smart-Technologies-Should-Start-Small_960px-x-540px.jpg" alt="Trip 3" />
            <h4>City Escape</h4>
            <p>Discover the vibrant culture and nightlife of the city.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;