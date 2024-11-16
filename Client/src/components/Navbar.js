// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Navbar.css';

function Navbar({ openLogin, openSignup }) {
  const openHomePage = () => {
    window.open('/HomePage', '_blank', 'noopener,noreferrer');
  };
  return (
    <nav className="navbar">
      <h1>Vihaara.com</h1>
      <ul className="navbar-links">
      <li>
          <a href="#">Home</a>
        </li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><button onClick={openLogin}>Login</button></li>
        <li><button onClick={openSignup}>Signup</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
