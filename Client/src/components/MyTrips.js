import React from 'react';
import { Link } from 'react-router-dom';
import './MyTrips.css';

function MyTrips() {
  // Example trips data
  const trips = [
    {
      id: 1,
      image: 'path-to-image1.jpg',
      status: 'Completed',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
    },
    {
      id: 2,
      image: 'path-to-image2.jpg',
      status: 'Active',
      startDate: '2024-05-01',
      endDate: '2024-05-10',
    },
    {
      id: 3,
      image: 'path-to-image3.jpg',
      status: 'Upcoming',
      startDate: '2024-12-01',
      endDate: '2024-12-07',
    },
  ];

  return (
    <div className="my-trips-page">
      <h1 className="page-title">My Trips</h1>

      {/* Trip Cards by Status */}
      <div className="trip-status-section">
        {['Completed', 'Active', 'Upcoming'].map((status) => (
          <div key={status} className="trip-category">
            <h2 className="category-title">{status} Trips</h2>
            <div className="trip-cards-container">
              {trips
                .filter((trip) => trip.status === status)
                .map((trip) => (
                  <Link
                    to={`/trip-details/${trip.id}`}
                    key={trip.id}
                    className="trip-card-link"
                  >
                    <div className="trip-card">
                      <div className="card-image-container">
                        <img
                          src={trip.image}
                          alt={`Trip ${trip.id}`}
                          className="trip-card-img"
                        />
                      </div>
                      <div className="trip-card-details">
                        <h3 className="trip-id">Trip ID: {trip.id}</h3>
                        <p className="trip-dates">
                          {trip.startDate} - {trip.endDate}
                        </p>
                        <p className="trip-status">{trip.status} Trip</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
