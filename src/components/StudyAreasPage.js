import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/StudyAreasPage.css';

const StudyAreasPage = () => (
  <main>
    <section className="study-areas fade-in">
      <div className="container">
        <h2>Study Areas</h2>
        <div className="study-areas-grid">
        <div className="study-area-card">
            <Link to="/bdh">
            <img src="/bdh.png" alt="BDH" />
            <h3>BDH</h3>
            </Link>
        </div>

          <div className="study-area-card">
            <img src="/nicely.png" alt="Nicely" />
            <h3>Nicely</h3>
          </div>
          <div className="study-area-card">
            <img src="/oxy.png" alt="Oxy" />
            <h3>Oxy</h3>
          </div>
          <div className="study-area-card">
            <img src="/osb.png" alt="OSB" />
            <h3>OSB</h3>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default StudyAreasPage;
