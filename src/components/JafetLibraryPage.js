import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LibraryDetails.css';

const JafetLibraryPage = () => (
  <main>
    <section className="library-details fade-in">
      <div className="container">
        <h2>Jafet Library</h2>
        <div className="library-content">
          <img src="/jafet.png" alt="Jafet Library" className="library-image" />
          <div className="library-info">
            <h3>Capacity:</h3>
            <p>500 seats</p>
            <h3>Number of people currently:</h3>
            <p>350</p>
            <h3>Status:</h3>
            <p>Open</p>
            <Link to="/heatmap" className="btn">View on heatmap</Link>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default JafetLibraryPage;
