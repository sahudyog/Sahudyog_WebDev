import React, { useState } from 'react';
import NearbyAttractions from './NearbyAttractions';
import LiveEvents from './LiveEvents';
import LocalGuides from './LocalGuides';
import './HomePage.css';

function HomePage() {
  const [destination, setDestination] = useState('');
  const [tourPlan, setTourPlan] = useState(null);
  const [myTrips, setMyTrips] = useState([
    { name: 'Paris Adventure', dates: '20th - 27th Nov', status: 'Active' },
    { name: 'New York Getaway', dates: '5th - 12th Dec', status: 'Upcoming' },
  ]);
  const [rewardsPoints, setRewardsPoints] = useState(500);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSearch = () => {
    // Call your API to get the tour plan based on the destination
    setTourPlan(
      `Recommended tour plan for ${destination}: 7-day trip to explore culture, food, and adventure.`
    );
  };

  const handleCancelTrip = (tripName) => {
    setMyTrips(myTrips.filter((trip) => trip.name !== tripName));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      {/* Navigation Bar */}
      <nav className="top-nav">
        <div className="logo">
          <a href="/">Vihaara.com</a>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter a place you'd like to visit"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="icons">
          <button className="notification-bell">🔔</button>
          <button className="user-menu">🧑</button>
          <button className="sos-button">🚨</button>
        </div>
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          ☰
        </button>
      </nav>

      {/* Side Navigation Panel */}
      {/* <aside className={`side-nav ${isSidebarOpen ? 'open' : 'closed'}`}>
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#my-trips">My Trips</a></li>
          <li><a href="#itinerary">Itinerary</a></li>
          <li><a href="#bookings">Bookings</a></li>
          <li><a href="#explore">Explore</a></li>
          <li><a href="#community">Community</a></li>
          <li><a href="#rewards">Rewards</a></li>
        </ul>
      </aside> */}

      {/* Main Content Area */}
      <main className="main-content">
        {/* Dashboard */}
        <section id="dashboard">
          <h1>Welcome back, [User Name]!</h1>
          <div className="stats-cards">
            <div className="card">
              Upcoming Trips: {myTrips.filter((trip) => trip.status === 'Upcoming').length}
            </div>
            <div className="card">Total Places Visited: 15</div>
            <div className="card">Points Earned: {rewardsPoints}</div>
          </div>
        </section>

        {/* Recommended Tour Plan */}
        <section id="tour-plan">
          <h2>Recommended Tour Plan</h2>
          {tourPlan ? (
            <p>{tourPlan}</p>
          ) : (
            <p>Enter a destination above to get a recommended tour plan.</p>
          )}
        </section>

        {/* My Trips */}
        <section id="my-trips">
          <h2>My Trips</h2>
          <div className="trip-cards">
            {myTrips.map((trip, index) => (
              <div className="trip-card" key={index}>
                <h3>{trip.name}</h3>
                <p>Dates: {trip.dates}</p>
                <p>Status: {trip.status}</p>
                <div className="trip-actions">
                  <button>Edit</button>
                  <button onClick={() => handleCancelTrip(trip.name)}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bookings */}
        <section id="bookings">
          <h2>Bookings</h2>
          <div className="booking-options">
            <div className="booking-card">
              <h3>Luxury Paris Tour</h3>
              <p>Price: $2,500 | Duration: 7 days</p>
              <button>Book Now</button>
            </div>
            <div className="booking-card">
              <h3>New York City Explorer</h3>
              <p>Price: $1,200 | Duration: 5 days</p>
              <button>Book Now</button>
            </div>
          </div>
        </section>

        {/* Explore */}
        <section id="explore">
          <h2>Explore</h2>
          <NearbyAttractions destination={destination} />
          <LiveEvents destination={destination} />
          <LocalGuides destination={destination} />
        </section>

        {/* Community */}
        <section id="community">
          <h2>Community</h2>
          <p>Join our forums, share tips, and ask questions!</p>
        </section>

        {/* Rewards */}
        <section id="rewards">
          <h2>Rewards</h2>
          <div className="reward-card">
            <h3>Travel Points</h3>
            <p>Current Points: {rewardsPoints}</p>
            <button>Redeem Points</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;  
