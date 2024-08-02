import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AreasPage from './components/AreasPage';
import LibrariesPage from './components/LibrariesPage';
import JafetLibraryPage from './components/JafetLibraryPage';
import SaabMedicalLibraryPage from './components/SaabMedicalLibraryPage';
import ScienceEngineeringLibraryPage from './components/ScienceEngineeringLibraryPage';
import HeatmapPage from './components/HeatmapPage';
import PageTransition from './components/PageTransition';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <PageTransition>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/areas" element={<AreasPage />} />
          <Route path="/libraries" element={<LibrariesPage />} />
          <Route path="/jafet" element={<JafetLibraryPage />} />
          <Route path="/saab-medical" element={<SaabMedicalLibraryPage />} />
          <Route path="/science-engineering" element={<ScienceEngineeringLibraryPage />} />
          <Route path="/heatmap" element={<HeatmapPage />} />
        </Routes>
      </PageTransition>
      <Footer />
    </Router>
  );
}

export default App;
