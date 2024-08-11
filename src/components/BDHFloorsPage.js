import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BDHFloorsPage.css';

const BDHFloorsPage = () => (
  <main>
    <section className="bdh-floors fade-in">
      <div className="container">
        <h2>BDH Floors</h2>
        <div className="floors-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="floor-card">
              <Link to={`/bdh/floor-${index + 1}`}>
                <h3>Floor {index + 1}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default BDHFloorsPage;
