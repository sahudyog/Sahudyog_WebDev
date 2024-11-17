import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-branding">
          <h2>Spectacular Tour Service</h2>
          <p>Your adventure starts here!</p>
        </div>
        <div className="footer-links">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <p>About Us</p>
            <p>Contact</p>
            <p>Privacy Policy</p>
          </div>
          <div id="contact" className="footer-section">
            <h3>Get in Touch</h3>
            <form>
              <input type="email" placeholder="Your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Spectacular Tour Service. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
