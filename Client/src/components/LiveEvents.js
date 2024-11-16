import React from 'react';

function LiveEvents({ destination }) {
  return (
    <div className="explore-card">
      <h3>Live Events</h3>
      {destination ? (
        <p>Live events in {destination}: Music Festival, Art Exhibition.</p>
      ) : (
        <p>Enter a destination to check live events.</p>
      )}
    </div>
  );
}

export default LiveEvents;