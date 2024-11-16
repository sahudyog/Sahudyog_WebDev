import React from 'react';
import './LocationInfo.css';

function LocationInfo() {
  return (
    <div className="location-info">
      <div>
        <p>Location</p>
        <p>Tabanan, Bali</p>
      </div>
      <div>
        <p>Date</p>
        <p>23-30 July 2023</p>
      </div>
      <div>
        <p>Traveler</p>
        <p>2 adults</p>
      </div>
      <button className="btn-booking">Booking now</button>
    </div>
  );
}

export default LocationInfo;
