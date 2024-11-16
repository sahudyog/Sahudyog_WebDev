import React from 'react';
import './LocalGuides.css';

function LocalGuides() {
  // Example guide data
  const guides = [
    {
      name: 'John Doe',
      contact: '+1-123-456-7890',
      address: '123 Elm Street, Cityville',
      place: 'Mount Batur',
    },
    {
      name: 'Jane Smith',
      contact: '+1-987-654-3210',
      address: '456 Oak Avenue, Townsville',
      place: 'Ubud Rice Terraces',
    },
    {
      name: 'Robert Brown',
      contact: '+1-555-555-5555',
      address: '789 Pine Road, Countryside',
      place: 'Hidden Waterfalls',
    },
  ];

  return (
    <div className="local-guides-page">
      <h1>Local Guides</h1>
      <div className="guides-container">
        {guides.map((guide, index) => (
          <div className="guide-card" key={index}>
            <h2>{guide.name}</h2>
            <p><strong>Contact:</strong> {guide.contact}</p>
            <p><strong>Address:</strong> {guide.address}</p>
            <p><strong>Guiding Place:</strong> {guide.place}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocalGuides;