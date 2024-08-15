import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Crowdy</Link>
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav>
          <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
            <li><Link to="/areas" onClick={toggleMenu}>Areas</Link></li>
            <li><Link to="/heatmap" onClick={toggleMenu}>Heatmap</Link></li>
            <li><a href="#about" onClick={() => { toggleMenu(); scrollToSection('about'); }}>About Us</a></li>
            <li><a href="#contact" onClick={() => { toggleMenu(); scrollToSection('contact'); }}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
