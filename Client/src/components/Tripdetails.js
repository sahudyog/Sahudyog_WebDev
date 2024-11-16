import React, { useEffect, useState } from 'react';
import './Tripdetails.css';

function TripDetails() {
  const [tripDetails, setTripDetails] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null); // State to track which day's details are visible

  useEffect(() => {
    const tripId = localStorage.getItem('tripId');
    const tripPlan = JSON.parse(localStorage.getItem('tripPlan'));

    if (tripId && tripPlan) {
      setTripDetails({ tripId, tripPlan });
    } else {
      console.log("No trip details found!");
    }
  }, []);

  const toggleDayDetails = (day) => {
    if (selectedDay === day) {
      setSelectedDay(null); // Hide details if the same day is clicked again
    } else {
      setSelectedDay(day); // Show details for the clicked day
    }
  };

  // Check if tripDetails or tripPlan is null or undefined
  if (!tripDetails || !tripDetails.tripPlan) {
    return <div>Loading trip details...</div>;
  }

  return (
    <div className="trip-details-page">
      {/* Image/Video Gallery Section */}
      <div className="media-gallery">
        <h2>Trip Media</h2>
        <div className="gallery">
          <img src="https://via.placeholder.com/300" alt="Trip Media 1" />
          <img src="https://via.placeholder.com/300" alt="Trip Media 2" />
          <video width="300" controls>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <img src="https://via.placeholder.com/300" alt="Trip Media 3" />
        </div>
      </div>

      {/* Plan and Map Sections */}
      <div className="details-sections">
        {/* Trip Plan */}
        <div className="trip-plan">
          <h2>Trip Plan</h2>
          <ul>
            {tripDetails.tripPlan.map((item, index) => (
              <li key={index}>
                <div className="day-summary" onClick={() => toggleDayDetails(item.day)}>
                  <strong>Day {item.day}:</strong> {item.activity}
                </div>
                {/* Show details only if the day is selected */}
                {selectedDay === item.day && (
                  <div className="day-details">
                    <p><strong>{item.date}</strong></p>
                    <p>{item.description}</p>

                    <h3>Recommended Hotels:</h3>
                    <ul>
                      {item.hotels.map((hotel, i) => (
                        <li key={i}>{hotel}</li>
                      ))}
                    </ul>

                    <h3>Famous Cuisines to Try:</h3>
                    <ul>
                      {item.food.map((cuisine, i) => (
                        <li key={i}>{cuisine}</li>
                      ))}
                    </ul>
                    
                    <h3>Famous Events Going On:</h3>
                    <ul>
                      {/* Check if events exist */}
                      {item.events ? item.events.map((event, i) => (
                        <li key={i}>{event}</li>
                      )) : <p>No events available for this day.</p>}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Map Section */}
        <div className="trip-map">
          <h2>Trip Map</h2>
          <div className="map-placeholder">
            {/* Replace with actual map integration (e.g., Google Maps iframe) */}
            <iframe
              src="https://maps.google.com/maps?q=your+trip+location&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="300px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;