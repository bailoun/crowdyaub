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
import StudyAreasPage from './components/StudyAreasPage';  
import BDHFloorsPage from './components/BDHFloorsPage';  
import BDHFloor2Page from './components/BDHFloor2Page';
import BDHFloor4Page from './components/BDHFloor4Page';
import BDHFloor5Page from './components/BDHFloor5Page';
import BDHFloor1Page from './components/BDHFloor1Page';  

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
          <Route path="/study-areas" element={<StudyAreasPage />} />
          <Route path="/bdh" element={<BDHFloorsPage />} />
          <Route path="/bdh/floor-1" element={<BDHFloor1Page />} /> 
          <Route path="/bdh/floor-2" element={<BDHFloor2Page />} />
          <Route path="/bdh/floor-4" element={<BDHFloor4Page />} />
          <Route path="/bdh/floor-5" element={<BDHFloor5Page />} />
          <Route path="/heatmap" element={<HeatmapPage />} />
        </Routes>
      </PageTransition>
      <Footer />
    </Router>
  );
}

export default App;
