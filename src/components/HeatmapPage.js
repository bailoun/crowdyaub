import React from 'react';
import '../styles/HeatmapPage.css';

const HeatmapPage = () => (
  <main>
    <section className="heatmap fade-in">
      <div className="container">
        <h2>Heatmap</h2>
        <img src="/heatmap.png" alt="Campus Heatmap" className="heatmap-image" />
      </div>
    </section>
  </main>
);

export default HeatmapPage;
