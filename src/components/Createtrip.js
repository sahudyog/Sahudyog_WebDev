import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Createtrip.css';

function Createtrip() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [places, setPlaces] = useState([]);
  const [tripId, setTripId] = useState(null);
  const [tripPlan, setTripPlan] = useState(null);

  const navigate = useNavigate(); // Initialize the navigate hook

  // Function to generate a unique trip ID
  const generateTripId = () => {
    return 'TRIP-' + Math.floor(Math.random() * 10000);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = generateTripId();
    setTripId(id);
    const plan = generateTripPlan(); // You would generate a real plan here
    setTripPlan(plan);

    // Save trip details to localStorage
    localStorage.setItem('tripId', id);
    localStorage.setItem('tripPlan', JSON.stringify(plan));

    // Navigate to the Trip Details page
    navigate('/trip-details');
  };

  // Function to generate a sample trip plan (replace with your own logic)
  const generateTripPlan = () => {
    return [
      { day: 1, activity: 'Arrival and Relaxation', date: '16 Dec, 2024' },
      { day: 2, activity: 'Sunrise at Mount Batur', date: '17 Dec, 2024' },
      { day: 3, activity: 'Waterfalls and Rice Terraces', date: '18 Dec, 2024' },
      { day: 4, activity: 'Relaxation and Local Exploration', date: '19 Dec, 2024' },
      { day: 5, activity: 'Hidden Waterfalls Adventure', date: '20 Dec, 2024' },
      { day: 6, activity: 'Ubud Highlights Tour', date: '21 Dec, 2024' },
    ];
  };

  // Handle place changes
  const handlePlaceChange = (e) => {
    const value = e.target.value;
    setPlaces(value.split(',').map(place => place.trim()));
  };

  return (
    <div className="create-trip-page">
      <div className="main-content">
        {/* Navbar */}
        <nav className="navbar">
          <div className="website-name">
            <h1>Vihaara.com</h1>
          </div>
          <div className="user-account">
            <img src="user-logo.jpg" alt="User" className="user-logo" />
          </div>
        </nav>

        {/* Trip Creation Form */}
        <section className="trip-form-section">
          <h2>Create Your Trip</h2>
          <form onSubmit={handleSubmit}>
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <br />
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            <br />
            <label>Places to Visit (comma separated):</label>
            <input
              type="text"
              value={places.join(', ')}
              onChange={handlePlaceChange}
              placeholder="e.g. Ubud, Mount Batur"
              required
            />
            <br />
            <button type="submit">Create Trip</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Createtrip;
