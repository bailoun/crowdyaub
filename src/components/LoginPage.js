// src/components/LoginPage.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // State to show messages
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');  // Clear any previous errors
    setMessage(''); // Clear any previous messages
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await user.reload();

      if (user.emailVerified) {
        navigate('/');
      } else {
        setError('Please verify your email and try again.');
        await auth.signOut();
      }
    } catch (error) {
      console.error("Firebase error code:", error.code);
      switch (error.code) {
        case 'auth/wrong-password':
          setError('Wrong Password. Please try again.');
          break;
        case 'auth/invalid-credential':
          setError('Invalid credentials. Please check your email and password and try again.');
          break;
        case 'auth/user-not-found':
          setError('Email not found. Please check and try again.');
          break;
        case 'auth/invalid-email':
          setError('Email must be an AUB email.');
          break;
        default:
          setError(`An unexpected error occurred: ${error.message}`);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email first.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (error) {
      console.error("Firebase error code:", error.code);
      setError('Error sending password reset email. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Sign In</h2>
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
        <button className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <p className="forgot-password-text" onClick={handlePasswordReset}>
          Forgot Password?
        </p>
        {error && <p className="login-error">{error}</p>}
        {message && <p className="login-message">{message}</p>}
        <p className="switch-form-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
