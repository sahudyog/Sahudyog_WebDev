import React, { useEffect, useState } from 'react';
import './Tripdetails.css';
import YouTubeVideoSuggestions from './Video'; // Import the Video.js component
import { useLocation } from 'react-router-dom';
import Maps from './Maps'; // Import Maps component
import SuggestNearbyPlaces from './NearbyPlaces'; // Import the SuggestNearbyPlaces component
import TripPlanner from './TripPlanner'; // Import TripPlanner component

function TripDetails() {
  const location = useLocation();
  const [tripDetails, setTripDetails] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null); // Track selected day
  const [isDarkMode, setIsDarkMode] = useState(false); // Track dark mode state
  const [destinationsWithSource, setDestinationsWithSource] = useState([]);
  const startDate = localStorage.getItem('startDate');
  const endDate = localStorage.getItem('endDate');
  // Get destinations and source from location or localStorage
  const destinations = location.state?.destinations || JSON.parse(localStorage.getItem('destinations'));
  const source = localStorage.getItem('source');  // Corrected the key to 'source' instead of 'sorce'

  // Ensure source is added first and then the destinations
  useEffect(() => {
    if (source && destinations && destinations.length > 0) {
      // Push source first, then push the rest of the destinations
      setDestinationsWithSource([source, ...destinations]);
    } else if (destinations) {
      // If no source, just use destinations as is
      setDestinationsWithSource(destinations);
    }
  }, [source, destinations]);

  // Get trip details from localStorage
  useEffect(() => {
    const tripId = localStorage.getItem('tripId');
    const tripPlan = JSON.parse(localStorage.getItem('tripPlan'));

    if (tripId && tripPlan) {
      setTripDetails({ tripId, tripPlan });
    } else {
      console.log('No trip details found!');
    }
  }, []);

  // Toggle day details visibility
  const toggleDayDetails = (day) => {
    setSelectedDay(selectedDay === day ? null : day);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle dark mode
  };

  if (!tripDetails || !tripDetails.tripPlan) {
    return <div>Loading trip details...</div>;
  }

  return (
    <div className={`trip-details-page ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* YouTube Video Suggestions with dynamic destination */}
      {destinationsWithSource && destinationsWithSource.length > 0 && (
        <YouTubeVideoSuggestions destination={destinationsWithSource[destinationsWithSource.length - 1]} />
      )}

      <div className="details-sections">
        <div className="trip-plan">
          <h2>Adventure Awaits</h2>
          <ul>
            {tripDetails.tripPlan.map((item, index) => (
              <li key={index}>
                <div className="day-summary" onClick={() => toggleDayDetails(item.day)}>
                  <strong>Day {item.day}:</strong> {item.activity}
                </div>
                {selectedDay === item.day && (
                  <div className="day-details">
                    {/* Your day details content */}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <TripPlanner
          source={source}
          destinations={destinationsWithSource}
          startDate={startDate}
          endDate={endDate}
        />     
        {destinationsWithSource.length > 0 && <SuggestNearbyPlaces destination={destinationsWithSource[destinationsWithSource.length - 1]} />}

        {/* Maps */}
        {destinationsWithSource && destinationsWithSource.length > 0 && (
          <div className="map-container">
            <Maps destinations={destinationsWithSource} />
          </div>
        )}

        {/* Trip Planner Section */}
        
      </div>
    </div>
  );
}

export default TripDetails;
