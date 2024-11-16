import React from 'react';

function NearbyAttractions({ destination }) {
  return (
    <div className="explore-card">
      <h3>Nearby Attractions</h3>
      {destination ? (
        <p>Attractions near {destination} include XYZ Museum, ABC Park, and more.</p>
      ) : (
        <p>Enter a destination to explore attractions.</p>
      )}
    </div>
  );
}

export default NearbyAttractions;
