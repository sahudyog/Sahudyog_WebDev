import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Auth.css';

function Signup({ closeModals, openLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook to navigate to another page

  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name); // Only letters and spaces
  const validatePhoneNumber = (phoneNumber) => /^[0-9]{10}$/.test(phoneNumber); // 10 digits
  const validatePassword = (password) => password.length >= 6; // Minimum 6 characters
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email); // Simple email validation

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset error message
    setErrorMessage('');

    // Validation checks
    if (!validateName(name)) return setErrorMessage("Please enter a valid name (letters and spaces only).");
    if (!validateEmail(email)) return setErrorMessage("Please enter a valid email.");
    if (!validatePhoneNumber(phoneNumber)) return setErrorMessage("Please enter a valid 10-digit phone number.");
    if (!gender) return setErrorMessage("Please select your gender.");
    const validatePassword = (password) => {
      // Check if the password is at least 6 characters long
      if (password.length < 6) {
        return false;
      }
    
      // Optional: Check if password contains at least one lowercase letter
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      
      // Optional: Check if password contains at least one number
      if (!hasLowercase || !hasUppercase || !hasNumber) {
        return false;
      }
    
      return true;
    };

    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, and a number.");
      return;
    }
    if (!validatePassword(password)) return setErrorMessage("Password must be at least 6 characters long.");
    if (password !== confirmPassword) return setErrorMessage("Passwords do not match.");

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          email,
          password,
          fullName: name,
          gender,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful signup
        closeModals(); // Close modal
        navigate('/login'); // Redirect to login
      } else {
        // Handle server error
        setErrorMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModals}>&times;</span>
        <h2>Signup</h2>
        <form className="auth-form" onSubmit={handleSignup}>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Phone Number:</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Signup'}
          </button>
          <p>
            Already have an account? <span onClick={openLogin}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
