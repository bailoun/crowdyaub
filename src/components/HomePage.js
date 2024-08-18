import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    });

    elements.forEach(element => {
      observer.observe(element);
    });
  }, []);

  return (
    <main>
      <section className="hero fade-in">
        <div className="hero-content">
          <img src="/map.png" alt="Campus Map" className="hero-image" />
          <div className="hero-text">
            <h2>Crowdy</h2>
            <p>Track Campus Traffic Instantly</p>
            {/* Wrap the button in a div */}
            <div style={{ marginTop: '2rem' }}> 
              <Link to="/areas" className="btn">View Areas</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="idea fade-in">
        <div className="container">
          <div className="idea-content">
            <img src="/campus.jpg" alt="Campus" className="idea-image" />
            <div className="idea-text">
              <h2>The Idea</h2>
              <p>Our project is a unique initiative led by students, for students, aimed at predicting crowd density across our university campus. By leveraging cutting-edge technology and innovative data analysis techniques, we strive to enhance the campus experience by providing real-time insights into crowd levels.</p>
              <p>This student-driven project reflects our commitment to fostering a collaborative and tech-savvy community, empowering our peers with valuable information to navigate campus life more efficiently in both time and practice.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="about fade-in">
        <div className="container">
          <h2>About Us</h2>
          <div className="about-content">
            <div className="about-item">
              <div className="about-icon"><i className="fas fa-info-circle"></i></div>
              <div className="about-text">
                <h3>Mohamad Bailoun</h3>
                <p>Major in Computer Science & Engineering</p>
              </div>
            </div>
            <div className="about-item">
              <div className="about-icon"><i className="fas fa-info-circle"></i></div>
              <div className="about-text">
                <h3>Ghanem El Zein</h3>
                <p>Double major in Computer Science and Economics</p>
              </div>
            </div>
            <div className="about-item">
              <div className="about-icon"><i className="fas fa-info-circle"></i></div>
              <div className="about-text">
                <h3>Rami El Khatib</h3>
                <p>Major in Electrical & Computer Engineering</p>
              </div>
            </div>
            <div className="about-item">
              <div className="about-icon"><i className="fas fa-info-circle"></i></div>
              <div className="about-text">
                <h3>Sara Houeidi</h3>
                <p>Major in Biomedical Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="contact fade-in">
        <div className="container">
          <h2>Contact Us</h2>
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message"></textarea>
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
