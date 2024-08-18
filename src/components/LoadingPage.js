// LoadingPage.js

import React from 'react';
import '../styles/LoadingPage.css'; // Ensure you create this CSS file or include the styles in App.css

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingPage;
