import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';


function GuideSignup({ closeModals, openLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [place, setPlace] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!name || !validateName(name)) {
      setErrorMessage('Please enter a valid name (letters and spaces only).');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!gender) {
      setErrorMessage('Please select your gender.');
      return;
    }
    if (!address) {
      setErrorMessage('Please enter your address.');
      return;
    }
    if (!place) {
      setErrorMessage('Please enter the place you want to guide.');
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, and a number.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // API call to backend
      const response = await fetch('/api/guide/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fullName: name,
          phoneNumber,
          gender,
          address,
          place,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Signup successful!');
        closeModals();
        navigate('/'); // Navigate to the login or home page
      } else {
        setErrorMessage(result.message || 'Signup failed!');
      }
    } catch (err) {
      setErrorMessage('Something went wrong! Please try again later.');
      console.error(err);
    }
  };

  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const validatePhoneNumber = (phoneNumber) => /^[0-9]{10}$/.test(phoneNumber);
  const validatePassword = (password) => {
    if (password.length < 6) return false;
    return /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password);
  };
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  
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
          <label>Address:</label>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label>Place:</label>
          <input
            type="text"
            placeholder="Enter the place you want to guide"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
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


          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Signup</button>
          <p>Already have an account? <span onClick={openLogin}>Login</span></p>
        </form>
      </div>
    </div>
  );
}

export default GuideSignup;
