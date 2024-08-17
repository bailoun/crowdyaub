// src/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import BDHFloor1Page from './components/BDHFloor1Page';
import BDHFloor5Page from './components/BDHFloor5Page';  
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';  // Importing SignUpPage component

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        if (currentUser.emailVerified) {
          setUser(currentUser);
        } else {
          await auth.signOut();
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {user && <Header user={user} />}
      <PageTransition>
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/areas" element={user ? <AreasPage /> : <Navigate to="/login" />} />
          <Route path="/libraries" element={user ? <LibrariesPage /> : <Navigate to="/login" />} />
          <Route path="/jafet" element={user ? <JafetLibraryPage /> : <Navigate to="/login" />} />
          <Route path="/saab-medical" element={user ? <SaabMedicalLibraryPage /> : <Navigate to="/login" />} />
          <Route path="/science-engineering" element={user ? <ScienceEngineeringLibraryPage /> : <Navigate to="/login" />} />
          <Route path="/study-areas" element={user ? <StudyAreasPage /> : <Navigate to="/login" />} />
          <Route path="/bdh" element={user ? <BDHFloorsPage /> : <Navigate to="/login" />} />
          <Route path="/bdh/floor-1" element={user ? <BDHFloor1Page /> : <Navigate to="/login" />} /> 
          <Route path="/bdh/floor-2" element={user ? <BDHFloor2Page /> : <Navigate to="/login" />} />
          <Route path="/bdh/floor-4" element={user ? <BDHFloor4Page /> : <Navigate to="/login" />} />
          <Route path="/bdh/floor-5" element={user ? <BDHFloor5Page /> : <Navigate to="/login" />} />
          <Route path="/heatmap" element={user ? <HeatmapPage /> : <Navigate to="/login" />} />
        </Routes>
      </PageTransition>
      <Footer />
    </Router>
  );
}

export default App;
