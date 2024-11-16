import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Import necessary Google Map components

function TripDetails() {
  const [tripId, setTripId] = useState(null);
  const [tripPlan, setTripPlan] = useState([]);
  const [places, setPlaces] = useState([]);
  
  useEffect(() => {
    // Retrieve trip details from localStorage or state
    const savedTripId = localStorage.getItem('tripId');
    const savedTripPlan = JSON.parse(localStorage.getItem('tripPlan'));

    if (savedTripId && savedTripPlan) {
      setTripId(savedTripId);
      setTripPlan(savedTripPlan);
      
      // Example list of places with their latitude and longitude
      setPlaces([
        { name: 'Ubud', lat: -8.5069, lng: 115.2625 },
        { name: 'Mount Batur', lat: -8.2522, lng: 115.3737 },
        { name: 'Tegallalang Rice Terrace', lat: -8.4058, lng: 115.2870 },
        { name: 'Hidden Waterfalls', lat: -8.4333, lng: 115.3281 },
        { name: 'Ubud Palace', lat: -8.5070, lng: 115.2635 }
      ]);
    }
  }, []);

  // Google Maps configuration
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: -8.5,  // Center map to a default location (you can adjust it)
    lng: 115.3
  };

  return (
    <div className="trip-details-page">
      <h2>Trip ID: {tripId}</h2>
      <h3>Trip Plan</h3>
      <ul>
        {tripPlan.map((item) => (
          <li key={item.day}>
            <strong>Day {item.day}: </strong>{item.activity} <span>({item.date})</span>
          </li>
        ))}
      </ul>

      {/* Google Map with markers for each place */}
      <div className="map-section">
        <h3>Trip Locations</h3>
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"> {/* Replace with your API key */}
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
          >
            {places.map((place, index) => (
              <Marker
                key={index}
                position={{ lat: place.lat, lng: place.lng }}
                label={place.name}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default TripDetails;
