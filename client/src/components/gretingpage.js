import React from 'react';

function GreetingPage() {
  return (
    <div className="greeting-page">
      <h1>Welcome to Vihaara!</h1>
      <p>Your perfect travel companion to explore the world.</p>

      <div className="recommended-trips">
        <h3>Recommended Trip Packages</h3>
        <div className="trip-cards">
          <div className="trip-card">
            <img src="trip1.jpg" alt="Trip 1" className="trip-card-img" />
            <h4>Beach Paradise</h4>
            <p>Enjoy a relaxing beach vacation with crystal-clear waters.</p>
          </div>
          <div className="trip-card">
            <img src="trip2.jpg" alt="Trip 2" className="trip-card-img" />
            <h4>Mountain Adventure</h4>
            <p>Explore the high peaks and enjoy thrilling activities.</p>
          </div>
          <div className="trip-card">
            <img src="trip3.jpg" alt="Trip 3" className="trip-card-img" />
            <h4>City Escape</h4>
            <p>Discover the vibrant culture and nightlife of the city.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GreetingPage;
