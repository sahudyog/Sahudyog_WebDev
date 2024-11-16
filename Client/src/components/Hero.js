import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div>
      <div className="hero">
        {/* Local Background Video */}
        <video
          className="background-video"
          src={`${process.env.PUBLIC_URL}/nature1.mp4`} // Reference the video in the public folder
          autoPlay
          loop
          muted
        ></video>

        {/* Hero Text Content */}
        <div className="hero-text">
          <h1>Plan Your Perfect Tour with Vihaara</h1>
          <p>
            At Vihaara, we specialize in crafting personalized travel itineraries tailored<br />
            to your preferences. Discover the best tour packages and get recommendations for unforgettable 
            travel experiences designed just for you.
          </p>

          <button className="btn-see-more">See more</button>
        </div>
      </div>

      {/* About Vihaara Section */}
      <div id="about" className="about-section">
        <div className="about-content">
          <h2>About Vihaara</h2>
          <p>
            We are dedicated to curating personalized itineraries that showcase Bali's breathtaking landscapes, multicultural, and authentic charm. We are here to guide you on a remarkable journey filled with joy, discovery, and cherished memories. Let us be your gateway to the extraordinary of Bali.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
