import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AreasPage.css';

const AreasPage = () => (
  <main>
    <section className="areas fade-in">
      <div className="container">
        <h2>Areas</h2>
        <div className="areas-grid">
          <div className="area-card">
            <img src="/charles-hostler.png" alt="Charles Hostler" />
            <h3>Charles Hostler</h3>
          </div>
          <div className="area-card">
            <Link to="/libraries"><img src="/libraries.png" alt="Libraries" /></Link>
            <h3><Link to="/libraries">Libraries</Link></h3>
          </div>
          <div className="area-card">
            <img src="/study-areas.png" alt="Study Areas" />
            <h3>Study Areas</h3>
          </div>
          <div className="area-card">
            <img src="/cafeterias.png" alt="Cafeterias" />
            <h3>Cafeterias</h3>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default AreasPage;
