// src/components/SignUpPage.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons
import '../styles/LoginPage.css';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    setError('');  // Clear any previous errors
    if (email.endsWith('@mail.aub.edu') || email.endsWith('@aub.edu.lb')) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        alert('Verification email sent! Please verify your email before logging in.');
        await auth.signOut();
        navigate('/login');
      } catch (error) {
        console.error("Firebase error code:", error.code);
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('This email is already in use. Please try logging in.');
            break;
          case 'auth/invalid-email':
            setError('Email must be an AUB email.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak. Please choose a stronger password.');
            break;
          default:
            setError(`An unexpected error occurred: ${error.message}`);
            break;
        }
      } finally {
        setLoading(false);
      }
    } else {
      setError('Email must be an AUB email.');
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Sign Up</h2>
      <div className="login-form">
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on state
            className="login-input password-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button className="signup-button" onClick={handleSignUp} disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        {error && <p className="login-error">{error}</p>}
        <p className="switch-form-text">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
