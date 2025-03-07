// Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-brand">
          <i className="bi bi-restaurant"></i>
          RestaurantPro
        </div>
        <div className="nav-links">
          <Link to="/adminlogin" className="nav-button">Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Restaurant Management System</h1>
          <p>Streamline your restaurant operations with our comprehensive management solution</p>
          <Link to="/dashboard" className="cta-button">Get Started</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="bi bi-cart-check"></i>
            <h3>Order Management</h3>
            <p>Efficiently manage orders and track their status in real-time</p>
          </div>
          <div className="feature-card">
            <i className="bi bi-people"></i>
            <h3>Customer Management</h3>
            <p>Keep track of customer preferences and ordering history</p>
          </div>
          <div className="feature-card">
            <i className="bi bi-calendar-check"></i>
            <h3>Reservation System</h3>
            <p>Handle table reservations and manage seating arrangements</p>
          </div>
          <div className="feature-card">
            <i className="bi bi-graph-up"></i>
            <h3>Analytics & Reports</h3>
            <p>Generate detailed reports and analyze business performance</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-content">
          <h2>Why Choose Us?</h2>
          <ul className="benefits-list">
            <li><i className="bi bi-check-circle"></i> Intuitive and user-friendly interface</li>
            <li><i className="bi bi-check-circle"></i> Real-time monitoring and updates</li>
            <li><i className="bi bi-check-circle"></i> Secure data management</li>
            <li><i className="bi bi-check-circle"></i> 24/7 customer support</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <i className="bi bi-restaurant"></i>
            RestaurantPro
          </div>
          <p>&copy; 2024 Restaurant Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;