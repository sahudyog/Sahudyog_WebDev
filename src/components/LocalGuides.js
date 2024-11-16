import React from 'react';

function LocalGuides({ destination }) {
  const guides = {
    Paris: 'John Doe - +33 1 23 45 67 89',
    'New York': 'Jane Smith - +1 212-555-1234',
    Tokyo: 'Taro Yamada - +81 90 1234 5678',
    Bali: 'Putu Wayan - +62 361 123 456',
  };

  return (
    <div className="explore-card">
      <h3>Local Guides</h3>
      {destination && guides[destination] ? (
        <p>Guide for {destination}: {guides[destination]}</p>
      ) : (
        <p>Enter a destination to find local guides.</p>
      )}
    </div>
  );
}

export default LocalGuides;
