import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
// import LoadingPage from './components/LoadingPage';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';

import './App.css';

function AppContent() {
  const user = null;
  const location = useLocation(); // Get the current location

  // Auth gating is intentionally disabled so the site is publicly accessible.
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     if (currentUser) {
  //       await currentUser.reload();
  //       if (currentUser.emailVerified) {
  //         setUser(currentUser);
  //       } else {
  //         await auth.signOut();
  //         setUser(null);
  //       }
  //     } else {
  //       setUser(null);
  //     }
  //     setLoading(false);
  //   });
  //
  //   return () => unsubscribe();
  // }, []);
  //
  // if (loading) {
  //   return <LoadingPage />;
  // }

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
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
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
