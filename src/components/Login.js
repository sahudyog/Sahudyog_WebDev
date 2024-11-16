import React, { useState } from 'react';
import './Auth.css';

function Login({ closeModals, openSignup }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading before navigating
    setTimeout(() => {
      window.open('/HomePage', '_blank', 'noopener,noreferrer');
      setIsLoading(false); // Reset loading state
    }, 2000); // Adjust timeout duration as needed
  };

  return (
    <div className="modal">
      {isLoading ? (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading, please wait...</p>
        </div>
      ) : (
        <div className="modal-content">
          {/* <span className="close" onClick={closeModals}>&times;</span> */}
          <h2>Login</h2>
          <form className="auth-form" onSubmit={handleLogin}>
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" required />
            <label>Password:</label>
            <input type="password" placeholder="Enter your password" required />
            <button type="submit">Login</button>
            <p>Don't have an account? <span onClick={openSignup}>Signup</span></p>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
