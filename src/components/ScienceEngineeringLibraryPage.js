import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LibraryDetails.css';

const ScienceEngineeringLibraryPage = () => (
  <main>
    <section className="library-details fade-in">
      <div className="container">
        <h2>Science and Engineering Library</h2>
        <div className="library-content">
          <img src="/science-engineering.png" alt="Science and Engineering Library" className="library-image" />
          <div className="library-info">
            <h3>Capacity:</h3>
            <p>200 seats</p>
            <h3>Number of people currently:</h3>
            <p>120</p>
            <h3>Status:</h3>
            <p>Open</p>
            <Link to="/heatmap" className="btn">View on heatmap</Link>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default ScienceEngineeringLibraryPage;
