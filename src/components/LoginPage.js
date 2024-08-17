// src/components/LoginPage.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { FaEye, FaEyeSlash, FaEnvelope } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCaptchaChange = (value) => {
    setCaptchaValid(!!value);
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email to reset the password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (error) {
      console.error("Firebase error code:", error.code);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('Email not found. Please check and try again.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address. Please check and try again.');
          break;
        default:
          setError(`An unexpected error occurred: ${error.message}`);
          break;
      }
    }
  };

  const handleLogin = async () => {
    if (!captchaValid) {
      setError('Please complete the CAPTCHA.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-form-wrapper">
      <div className="login-container">
        <h2 className="login-title">Sign In</h2>
        <div className="login-form">
          <div className="email-container">
            <input
              type="email"
              className="login-input email-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <FaEnvelope className="email-icon" />
          </div>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
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
          <ReCAPTCHA
            sitekey="6Lcy_igqAAAAAKvKcSfaYudIdxo7uGqcaedRzdrH" // Your reCAPTCHA v2 site key
            onChange={handleCaptchaChange}
          />
          <button className="login-button" onClick={handleLogin} disabled={loading || !captchaValid}>
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
    </div>
  );
};

export default LoginPage;
