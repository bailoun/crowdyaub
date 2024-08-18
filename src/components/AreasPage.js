import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AreasPage.css';

const AreasPage = () => (
  <main>
    <section className="areas fade-in">
      <div className="container">
        <h2>Areas</h2>
        <div className="areas-grid">
          <div className="area-card disabled">
            <img src="/charles-hostler.png" alt="Charles Hostler" />
            <h3>Charles Hostler</h3>
          </div>
          <div className="area-card disabled">
            <img src="/libraries.png" alt="Libraries" />
            <h3>Libraries</h3>
          </div>
          <div className="area-card">
            <Link to="/study-areas" title="View traffic in classrooms of AUB's buildings">
              <img src="/study-areas.png" alt="Study Areas" />
            </Link>
            <h3><Link to="/study-areas">Study Areas</Link></h3>
          </div>
          <div className="area-card disabled">
            <img src="/cafeterias.png" alt="Cafeterias" />
            <h3>Cafeterias</h3>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default AreasPage;
