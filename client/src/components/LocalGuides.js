import React, { useState, useEffect } from 'react';
import './LocalGuides.css';

function LocalGuides() {
  // State to hold the list of guides
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState(null);

  // Fetch guides from the backend
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        console.log('Fetching guides...');
        const response = await fetch('/api/guide/getData');
        console.log('Response:', response);
        const data = await response.json();
        console.log('Data:', data);

        if (data.status == "success") {
          setGuides(data.data); // Assuming API response has a data field with the guides
        } else {
          setError(data.message || 'Failed to fetch guides');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      }
    };

    fetchGuides();
  }, []);

  return (
    <div className="local-guides-page">
      <h1>Local Guides</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="guides-container">
        {guides.length > 0 ? (
          guides.map((guide, index) => (
            <div className="guide-card" key={index}>
              <h2>{guide.name}</h2>
              <p><strong>Contact:</strong> {guide.phone || guide.contact}</p>
              <p><strong>Address:</strong> {guide.address}</p>
              <p><strong>Guiding Place:</strong> {guide.place}</p>
            </div>
          ))
        ) : (
          !error && <p>Loading guides...</p>
        )}
      </div>
    </div>
  );
}

export default LocalGuides;