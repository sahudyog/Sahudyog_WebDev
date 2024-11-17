import React from 'react';
import './Navbar.css';

function Navbar({ openLogin, openSignup, openGuideSignup }) {
  return (
    <nav className="navbar">
      <h1>Vihaara.com</h1>
      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><button onClick={openLogin}>Login</button></li>
        <li><button onClick={openSignup}>Signup</button></li>
        <li><button onClick={openGuideSignup}>Guide Signup</button></li> {/* Open GuideSignup modal */}
      </ul>
    </nav>
  );
}

export default Navbar;
