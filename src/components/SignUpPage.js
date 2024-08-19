import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase'; 
import { FaEye, FaEyeSlash, FaEnvelope } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/LoginPage.css';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaError, setCaptchaError] = useState('');  // New state for captcha error message
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCaptchaChange = (value) => {
    setCaptchaValid(!!value);
    setCaptchaError('');  // Clear the captcha error message when CAPTCHA is completed
  };

  const handleSignUp = async () => {
    if (!captchaValid) {
      setCaptchaError('Please complete the CAPTCHA.');
      return;
    }

    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setLoading(false);
      return;
    }

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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="login-form-wrapper">
      <div className="login-container">
        <h2 className="login-title">Sign Up</h2>
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
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="login-input password-input"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
            <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
            <ReCAPTCHA
              sitekey="6Lcy_igqAAAAAKvKcSfaYudIdxo7uGqcaedRzdrH"
              onChange={handleCaptchaChange}
            />
          </div>
          {captchaError && <p className="login-error">{captchaError}</p>}
          <button className="login-button" onClick={handleSignUp} disabled={loading}>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          {error && <p className="login-error">{error}</p>}
          <p className="switch-form-text">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
