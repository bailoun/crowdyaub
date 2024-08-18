import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
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
import BDHFloor1Page from './components/BDHFloor1Page';
import BDHFloor2Page from './components/BDHFloor2Page';
import BDHFloor4Page from './components/BDHFloor4Page';  
import BDHFloor5Page from './components/BDHFloor5Page';  
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import LoadingPage from './components/LoadingPage';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import './App.css';

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Get the current location

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
    return <LoadingPage />;
  }

  // Check if the current path should hide the header or footer
  const shouldShowHeaderAndFooter = () => {
    return !['/login', '/signup'].includes(location.pathname);
  };

  return (
    <>
      {shouldShowHeaderAndFooter() && <Header user={user} />} {/* Conditionally render the header */}
      <div className="main-content">
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
      </div>
      {shouldShowHeaderAndFooter() && <Footer />}  {/* Conditionally render the footer */}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
