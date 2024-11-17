import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './HomePage.css';

const Homepage = ({ username }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openBar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <nav className="home_navbar">
        <div className="logo_container">
          <a type="button" onClick={openBar} id="menu1" className="menu-icon">
            <i className="bx bx-menu"></i>
          </a>
          <div className="website-name">
            <h1>vihaara.com</h1>
          </div>
        </div>
        <div className="user-details">
          <span>Welcome, {username}</span>
        </div>
      </nav>

      <div
        className={`home_banner ${sidebarOpen ? 'sidebar-open' : ''}`}
      >
        {/* Add optional text or components here */}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button type="button" onClick={closeSidebar} className="close-icon">
          <i className="bx bx-x"></i>
        </button>
        <ul>
          <li>
            <Link to="dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="my-trips">My Trips</Link>
          </li>
          <li>
            <Link to="photos-upload">Photos Upload</Link>
          </li>
          <li>
            <Link to="local-guides">Local Guides</Link>
          </li>
          {/* <li>
            <Link to="community">Community</Link>
          </li> */}
        </ul>
      </div>

      {/* Main Content */}
      <div
        className="main-content"
        style={{
          marginLeft: sidebarOpen ? '250px' : '0', // Adjust margin when sidebar is open
          transition: 'margin-left 0.3s ease', // Smooth animation
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Homepage;