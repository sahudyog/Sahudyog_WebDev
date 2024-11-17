import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [selectedTrip, setSelectedTrip] = useState(null); // State to track selected trip

  // Trip data
  const trips = [
    {
      id: 1,
      title: 'Beach Paradise',
      description: 'Enjoy a relaxing beach vacation with crystal-clear waters.',
      details: {
        duration: '5 Days / 4 Nights',
        itinerary: 'Day 1: Arrival and check-in. Day 2: Beach activities and snorkeling. Day 3: Island hopping. Day 4: Relax at the spa. Day 5: Departure.',
        placesCovered: 'Maldives, Maafushi Island, and Male City.',
      },
      image: 'https://media.istockphoto.com/id/610041376/photo/beautiful-sunrise-over-the-sea.jpg?s=612x612&w=0&k=20&c=R3Tcc6HKc1ixPrBc7qXvXFCicm8jLMMlT99MfmchLNA=',
    },
    {
      id: 2,
      title: 'Mountain Adventure',
      description: 'Explore the high peaks and enjoy thrilling activities.',
      details: {
        duration: '7 Days / 6 Nights',
        itinerary: 'Day 1: Arrival and orientation. Day 2-4: Guided trek through mountain trails. Day 5: Adventure sports. Day 6: Relax at a hillside retreat. Day 7: Departure.',
        placesCovered: 'Himalayas, Manali, and Solang Valley.',
      },
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiFevKxJrbPBVlILYjNXA_sRs0uv3wx57e7w&s',
    },
    {
      id: 3,
      title: 'City Escape',
      description: 'Discover the vibrant culture and nightlife of the city.',
      details: {
        duration: '4 Days / 3 Nights',
        itinerary: 'Day 1: Arrival and city tour. Day 2: Visit museums and cultural sites. Day 3: Shopping and nightlife. Day 4: Departure.',
        placesCovered: 'New York City, Times Square, and Central Park.',
      },
      image: 'https://hbr.org/resources/images/article_assets/2016/01/04-Cities-Looking-to-Harness-Smart-Technologies-Should-Start-Small_960px-x-540px.jpg',
    },
  ];

  const handleCardClick = (trip) => {
    setSelectedTrip(trip);
  };

  const closePopup = () => {
    setSelectedTrip(null);
  };

  return (
    <div className="dashboard-page">
      <h2>Welcome to Vihaara,</h2>

      {/* Create a Trip Button */}
      <Link to="/create-trip">
        <button className="create-trip-button">Create a Trip</button>
      </Link>

      {/* Recommended Trip Packages */}
      <div className="recommended-trips">
        <h3>Recommended Trip Packages</h3>
        <div className="trip-cards">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="trip-card"
              onClick={() => handleCardClick(trip)}
            >
              <img src={trip.image} alt={trip.title} />
              <h4>{trip.title}</h4>
              <p>{trip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Card */}
      {selectedTrip && (
        <div className="popup-card">
          <div className="popup-content">
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>
            <h4>{selectedTrip.title}</h4>
            <p><strong>Duration:</strong> {selectedTrip.details.duration}</p>
            <p><strong>Places Covered:</strong> {selectedTrip.details.placesCovered}</p>
            <p><strong>Itinerary:</strong> {selectedTrip.details.itinerary}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
