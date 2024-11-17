import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Createtrip.css';

function Createtrip() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    source: '',
    destinations: [],
  });
  const [newDestination, setNewDestination] = useState('');
  const [tripId, setTripId] = useState(null);
  const [tripPlan, setTripPlan] = useState(null);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null); // State to hold user data

  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/userData', {
          method: 'GET',
          credentials: 'include', // Include cookies for authentication
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Check response status
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error: ${response.status}`);
        }
  
        // Parse and set user data
        const data = await response.json();
        setUser(data.user); // Assuming `data.user` contains user details
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setError('Failed to fetch user data. Please try again.');
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const generateTripId = () => {
    return 'TRIP-' + Math.floor(Math.random() * 10000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate || !formData.source || formData.destinations.length === 0) {
      setError('All fields are required, including at least one destination.');
      return;
    }

    const id = generateTripId();
    setTripId(id);
    const plan = generateTripPlan();
    setTripPlan(plan);

    localStorage.setItem('tripId', id);
    localStorage.setItem('tripPlan', JSON.stringify(plan));

    navigate('/trip-details');
  };

  const generateTripPlan = () => {
    return [
      {
        day: 1,
        activity: 'Arrival and Relaxation',
        description: 'Arrive at your destination and unwind at your hotel. Enjoy a relaxing evening.',
      },
      {
        day: 2,
        activity: 'Sunrise at Mount Batur',
        description: 'Catch the stunning sunrise at Mount Batur. Enjoy a peaceful hike and breathtaking views.',
      },
      {
        day: 3,
        activity: 'Waterfalls and Rice Terraces',
        description: 'Explore the famous waterfalls and rice terraces in the area.',
      },
    ];
  };

  const handleAddDestination = () => {
    if (newDestination && !formData.destinations.includes(newDestination)) {
      setFormData({
        ...formData,
        destinations: [...formData.destinations, newDestination],
      });
      setNewDestination('');
    } else if (!newDestination) {
      setError('Please enter a destination.');
    } else {
      setError('This destination is already added.');
    }
  };

  const handleRemoveDestination = (destinationToRemove) => {
    setFormData({
      ...formData,
      destinations: formData.destinations.filter((dest) => dest !== destinationToRemove),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`create-trip-page ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <nav className="custom-navbar">
        <div className="logo-container" onClick={toggleSidebar}>
          <h1>Vihaara.com</h1>
        </div>
        <div className="account-icon" onClick={toggleSidebar}>
          <img src="https://cdn-icons-png.flaticon.com/512/8345/8345328.png" alt="Account" />
        </div>
      </nav>

      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <section className="trip-form-section">
          <h2>Create Your Trip</h2>
          <form id="form1" onSubmit={handleSubmit} className="wide-form">
            <div className="form-field">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-field">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Source</label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                placeholder="e.g. New York"
                required
              />
            </div>

            <div className="form-field">
              <label>Destinations</label>
              <div className="destination-input">
                <input
                  type="text"
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  placeholder="e.g. Bali"
                />
                <button type="button" onClick={handleAddDestination}>
                  Add
                </button>
              </div>
              <div className="destinations-list">
                {formData.destinations.map((destination, index) => (
                  <div className="destination-card" key={index}>
                    <span>{destination}</span>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveDestination(destination)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Create Trip
            </button>

            {error && <p className="error-message">{error}</p>}
          </form>
        </section>
      </div>

      {isSidebarOpen && (
        <div className="custom-sidebar">
          <h3>User Account Details</h3>
          {user ? (
            <>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
          <button onClick={toggleSidebar}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Createtrip;
