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

  const navigate = useNavigate(); // Hook to navigate to another page

  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name); // Only letters and spaces
  const validatePhoneNumber = (phoneNumber) => /^[0-9]{10}$/.test(phoneNumber); // 10 digits
  const validatePassword = (password) => password.length >= 6; // Minimum 6 characters
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email); // Simple email validation

  const handleSignup = (e) => {
    e.preventDefault();

    // Reset error message
    setErrorMessage('');

    // Name validation
    if (!name || !validateName(name)) {
      setErrorMessage("Please enter a valid name (letters and spaces only).");
      return;
    }

    // Email validation
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    // Phone number validation
    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    // Gender validation
    if (!gender) {
      setErrorMessage("Please select your gender.");
      return;
    }

    // Password validation
    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Proceed with signup (e.g., call API)
    // Simulate successful signup
    setErrorMessage('');
    closeModals(); // Close modal and return to the main page

    // Redirect to the login page after successful signup
    navigate('/login'); // This will navigate to '/login' page
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
          
          <button type="submit" >Signup</button>
          <p>Already have an account? <span onClick={openLogin}>Login</span></p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
