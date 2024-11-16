import React from 'react';
import './CustomerReview.css';

function CustomerReview() {
  const reviews = [
    { name: "Alice", location: "New York", review: "Amazing experience! The tour was well-organized, and the guides were fantastic. Highly recommend!", rating: 5 },
    { name: "John", location: "California", review: "Great tour, but the timings could have been better. Still a wonderful experience!", rating: 4.3 },
    { name: "Emily", location: "London", review: "The best vacation I’ve had! Beautiful sights, great service, and memorable moments.", rating: 4.9 },
    { name: "Michael", location: "Sydney", review: "It was a good trip, but some aspects could be improved. Overall, it was fun.", rating: 4.0 }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star full">★</span>
        ))}
        {halfStar && <span className="star half">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="star empty">☆</span>
        ))}
      </>
    );
  };

  return (
    <div className="customer-review">
      <h2>Customer Reviews</h2>
      <div className="review-cards">
        {reviews.map((review, index) => (
          <div key={index} className="card">
            <h3>{review.name}</h3>
            <p><strong>Location:</strong> {review.location}</p>
            <p><strong>Review:</strong> {review.review}</p>
            <div className="rating">{renderStars(review.rating)}</div>
            <p>{review.rating} stars</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerReview;
