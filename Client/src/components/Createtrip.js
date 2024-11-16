import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Createtrip.css';

function Createtrip() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    source: '',
    destinations: [], // Array to store multiple destinations
  });
  const [newDestination, setNewDestination] = useState(''); // New destination input
  const [tripId, setTripId] = useState(null);
  const [tripPlan, setTripPlan] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize the navigate hook

  // Function to generate a unique trip ID
  const generateTripId = () => {
    return 'TRIP-' + Math.floor(Math.random() * 10000);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form inputs
    if (!formData.startDate || !formData.endDate || !formData.source || formData.destinations.length === 0) {
      setError("All fields are required, including at least one destination.");
      return;
    }

    const id = generateTripId();
    setTripId(id);
    const plan = generateTripPlan(); // Generate a real trip plan here
    setTripPlan(plan);

    // Save trip details to localStorage
    localStorage.setItem('tripId', id);
    localStorage.setItem('tripPlan', JSON.stringify(plan));

    // Navigate to the Trip Details page
    navigate('/trip-details');
  };

  // Function to generate a sample trip plan with descriptions, hotels, and food recommendations
  const generateTripPlan = () => {
    return [
      {
        day: 1,
        activity: 'Arrival and Relaxation',
        date: '16 Dec, 2024',
        description: 'Arrive at your destination and unwind at your hotel. Enjoy a relaxing evening.',
        hotels: ['Hotel Bliss', 'Ocean View Resort'],
        food: ['Grilled Fish at Sea Breeze', 'Traditional Balinese Dinner at Bumbu Bali']
      },
      {
        day: 2,
        activity: 'Sunrise at Mount Batur',
        date: '17 Dec, 2024',
        description: 'Catch the stunning sunrise at Mount Batur. Enjoy a peaceful hike and breathtaking views.',
        hotels: ['Kintamani Hotel', 'Batur View Villas'],
        food: ['Sunrise Breakfast at Kintamani Cafe', 'Balinese Coffee at Mt. Batur']
      },
      // Add more days as needed
    ];
  };

  // Handle adding a new destination to the destinations list
  const handleAddDestination = () => {
    if (newDestination && !formData.destinations.includes(newDestination)) {
      setFormData({
        ...formData,
        destinations: [...formData.destinations, newDestination], // Add new destination to the list
      });
      setNewDestination(''); // Clear the new destination input
    } else if (!newDestination) {
      setError("Please enter a destination.");
    } else {
      setError("This destination is already added.");
    }
  };

  // Handle removing a destination
  const handleRemoveDestination = (destinationToRemove) => {
    setFormData({
      ...formData,
      destinations: formData.destinations.filter(dest => dest !== destinationToRemove), // Remove the selected destination
    });
  };

  // Handle input changes for other fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the specific field in the form data
    });
  };

  return (
    <div className="create-trip-page">
      <div className="main-content">
        {/* Navbar */}
        <nav className="createTripNavbar">
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
          <form id='form1'onSubmit={handleSubmit}>
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
            <br />
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
            <br />
            <label>Source:</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              placeholder="e.g. New York"
              required
            />
            <br />
            <label>Destinations:</label>
            <input
              type="text"
              value={newDestination}
              onChange={(e) => setNewDestination(e.target.value)}
              placeholder="e.g. Bali"
            />
            <button type="button" onClick={handleAddDestination}>
              Add Destination
            </button>
            <ul>
              {formData.destinations.map((destination, index) => (
                <li key={index}>
                  {destination} <button type="button" onClick={() => handleRemoveDestination(destination)}>Remove</button>
                </li>
              ))}
            </ul>
            <br />
            <button type="submit">Create Trip</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </section>
      </div>
    </div>
  );
}

export default Createtrip;