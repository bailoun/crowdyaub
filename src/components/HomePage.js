import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import '../styles/HomePage.css';

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create promises for both email sends
    const promises = [
        emailjs.send('service_e6eexnb', 'template_8wf11y9', formData, 'tNTgroSTpHfJ6SHbu'),
        emailjs.send('service_e6eexnb', 'template_d336r5r', formData, 'tNTgroSTpHfJ6SHbu')
    ];

    // Handle both promises
    Promise.all(promises)
    .then((results) => {
        console.log("Both emails sent successfully!", results);
        setSuccessMessage('Message Sent Successfully!');
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    })
    .catch((error) => {
        console.error("An error occurred with one of the emails:", error);
        alert('An error occurred, Please try again');
    });
  };

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
          <img src="/map2.png" alt="Campus Map" className="hero-image" />
          <div className="hero-text">
            <h2>Crowdy</h2>
            <p>Track Campus Traffic Instantly</p>
            <div style={{ marginTop: '2rem' }}> 
              <Link to="/areas" className="btn">View Areas</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="idea fade-in">
        <div className="container">
          <div className="idea-content">
            <img src="/campus2.png" alt="Campus" className="idea-image" />
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
          {successMessage && <p style={{ color: 'green', fontWeight: 'bold' }}>{successMessage}</p>}  {/* Display success message */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
