import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BDHFloorsPage.css';

const BDHFloorsPage = () => (
  <main>
    <section className="bdh-floors fade-in">
      <div className="container">
        <h2>BDH Floors</h2>
        <div className="floors-grid">
          {[1, 2, 4, 5].map((floor) => (
            <div key={floor} className="floor-card">
              <Link to={`/bdh/floor-${floor}`}>
                <h3>Floor {floor}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default BDHFloorsPage;
