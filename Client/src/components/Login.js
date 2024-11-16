import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

function Login({ closeModals, openSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // On successful login, redirect to the HomePage
        closeModals();
        navigate('/HomePage/dashboard');
      } else {
        // Handle server errors
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
          <span className="close" onClick={closeModals}>&times;</span>
          <h2>Login</h2>
          <form className="auth-form" onSubmit={handleLogin}>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">Login</button>
            <p>
              Don't have an account? <span onClick={openSignup}>Signup</span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
