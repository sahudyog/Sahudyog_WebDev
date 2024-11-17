import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MyTrips.css';

function MyTrips() {
  // Example trips data
  const trips = [
    {
      id: 1,
      image: 'https://cdn1.tripoto.com/media/filter/nl/img/2176903/Image/1697125644_k1_9.jpg.webp',
      status: 'Completed',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
    },
    {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3WryL-2kV4DrBG70NI1k6eFs_FWqEWdl4lA&s',
      status: 'Completed',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
    },
    {
      id: 3,
      image: 'https://www.planetware.com/photos-large/IND/india-top-attractions-taj-mahal.jpg',
      status: 'Completed',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
    },
    {
      id: 4,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTiorGsiljPlriLGI41cfck7FSNAXJa_SvA&s',
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
    },
    {
      id: 5,
      image: 'https://indiatouristspots.weebly.com/uploads/7/9/4/2/79421790/8668213482-6b11383e5a-b_orig.jpg',
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
    },
    {
      id: 6,
      image: 'https://media.cntraveller.com/photos/611bf72ce98d5e6590e82c32/16:9/w_2560%2Cc_limit/14rome-jan-feb-2021-issue-jenny-zarins.jpg',
      status: 'Active',
      startDate: '2024-05-01',
      endDate: '2024-05-10',
    },
    {
      id: 7,
      image: 'https://www.hindustantimes.com/ht-img/img/2024/09/03/original/Coorg_1725352926642.jpg',
      status: 'Upcoming',
      startDate: '2024-12-01',
      endDate: '2024-12-07',
    },
    {
      id: 8,
      image: 'https://ihplb.b-cdn.net/wp-content/uploads/2018/02/Spiti-Valley-Himachal-Pradesh-1.jpg',
      status: 'Upcoming',
      startDate: '2024-12-01',
      endDate: '2024-12-07',
    },
    {
      id: 9,
      image: 'https://khabharkhoj.com/wp-content/uploads/2024/03/Humpi-1.jpg',
      status: 'Upcoming',
      startDate: '2024-12-01',
      endDate: '2024-12-07',
    },
  ];

  // State to track liked trips
  const [likedTrips, setLikedTrips] = useState([]);

  // Function to toggle like/unlike a trip
  const toggleLikeTrip = (id) => {
    setLikedTrips((prevLikedTrips) => {
      if (prevLikedTrips.includes(id)) {
        // Remove from liked trips
        return prevLikedTrips.filter((tripId) => tripId !== id);
      } else {
        // Add to liked trips
        return [...prevLikedTrips, id];
      }
    });
  };

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
                  <div key={trip.id} className="trip-card">
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
                    {/* Toggle Like Button */}
                    <button
                      onClick={() => toggleLikeTrip(trip.id)}
                      className={`like-btn ${likedTrips.includes(trip.id) ? 'liked' : ''}`}
                    >
                      {likedTrips.includes(trip.id) ? 'Unlike' : 'Like'}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Liked Trips Section (Displayed Last) */}
      <div className="trip-category">
        <h2 className="category-title">Liked Trips</h2>
        <div className="trip-cards-container">
          {trips
            .filter((trip) => likedTrips.includes(trip.id))
            .map((trip) => (
              <Link to={`/trip-details/${trip.id}`} key={trip.id} className="trip-card-link">
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
                    <p className="trip-status">Liked Trip</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyTrips;
