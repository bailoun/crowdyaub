import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LibrariesPage.css';

const LibrariesPage = () => (
  <main>
    <section className="libraries fade-in">
      <div className="container">
        <h2>Libraries</h2>
        <div className="libraries-grid">
          <div className="library-card">
            <Link to="/jafet">
              <img src="/jafet.png" alt="Jafet Library" />
              <h3>Jafet Library</h3>
              <p>View More &rarr;</p>
            </Link>
          </div>
          <div className="library-card">
            <Link to="/science-engineering">
              <img src="/science-engineering.png" alt="Science and Engineering Library" />
              <h3>Science and Engineering Library</h3>
              <p>View More &rarr;</p>
            </Link>
          </div>
          <div className="library-card">
            <Link to="/saab-medical">
              <img src="/saab-medical.png" alt="Saab Medical Library" />
              <h3>Saab Medical Library</h3>
              <p>View More &rarr;</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default LibrariesPage;
