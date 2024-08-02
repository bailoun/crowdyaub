import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== '/') {
      navigate('/');
    }

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Delay to ensure HomePage component has rendered
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Crowdy</Link>
        <nav>
          <ul className="nav-links">
            <li><Link to="/areas">Areas</Link></li>
            <li><Link to="/heatmap">Heatmap</Link></li>
            <li><a href="#about" onClick={() => scrollToSection('about')}>About Us</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
