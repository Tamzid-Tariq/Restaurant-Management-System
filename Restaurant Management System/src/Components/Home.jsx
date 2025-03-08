// import React, { useEffect, useState } from 'react';
// import Menu from './Menu';
// import LoginButton from './LoginButton';
// import RegisterButton from './RegisterButton';
// import './Home.css'; // Import the CSS file

// const Home = () => {
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/menu")
//       .then((response) => response.json())
//       .then((data) => {
//         // Map data to include full image URLs
//         const menuWithImages = data.map((item) => ({
//           ...item,
//           ImageURL: item.Image
//             ? `http://localhost:3000/uploads/${item.Image}`
//             : "/default-dish.png",
//           Price: Number(item.Price) || 0,
//           Name: item.Name,
//         }));
//         console.log(menuWithImages); // Debugging line to check the data
//         setMenuItems(menuWithImages);
//       })
//       .catch((error) => console.error("Error fetching menu:", error));
//   }, []);

//   return (
//     <div>
//       <header className="header">
//         <div className="button-container register-button">
//           <RegisterButton />
//         </div>
//         <div className="button-container login-button">
//           <LoginButton />
//         </div>
//       </header>
//       <h1 style={{ textAlign: 'center', backgroundColor: 'blue', color: 'white', width: '100%', padding: '20px 0', marginTop: '200px' }}>
//         Welcome to Restaurant X
//       </h1>
//       <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Here's our menu</h2>
//       <Menu items={menuItems} />
//     </div>
//   );
// };

// export default Home;


// Home.jsx
import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((response) => response.json())
      .then((data) => {
        const menuWithImages = data.map((item) => ({
          ...item,
          ImageURL: item.Image
            ? `http://localhost:3000/uploads/${item.Image}`
            : "Images/HomePage.avif",
          Price: Number(item.Price) || 0,
          Name: item.Name,
        }));
        setMenuItems(menuWithImages);
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  const scrollToMenu = () => {
    setShowMenu(true);
    setTimeout(() => {
      document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="logo">
          <img src="Images/dish.jpg" alt="Restaurant X Logo" />
          <span>Restaurant X</span>
        </div>
        <div className="nav-buttons">
          <div className="dropdown">
            <button className="login-btn">Login</button>
            <div className="dropdown-content">
              <Link to="/customerlogin">Customer Login</Link>
              <Link to="/adminlogin">Admin Login</Link>
            </div>
          </div>
          <button className="register-btn">Register</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Restaurant X</h1>
          <p>Experience the finest dining with our exceptional cuisine</p>
          <button className="order-now-btn" onClick={scrollToMenu}>
            Order Now
          </button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <i className="bi bi-clock"></i>
          <h3>Fast Delivery</h3>
          <p>30 minutes or free</p>
        </div>
        <div className="feature-card">
          <i className="bi bi-shield-check"></i>
          <h3>Fresh Food</h3>
          <p>100% quality guarantee</p>
        </div>
        <div className="feature-card">
          <i className="bi bi-tag"></i>
          <h3>Great Offers</h3>
          <p>Daily special deals</p>
        </div>
      </section>

      {showMenu && (
        <section id="menu-section" className="menu-section">
          <h2>Our Menu</h2>
          <Menu items={menuItems} />
        </section>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>📞 +880 123 456 7890</p>
            <p>📧 info@restaurantx.com</p>
            <p>📍 123 Dining Street, Foodville</p>
          </div>
          <div className="footer-section">
            <h4>Opening Hours</h4>
            <p>Monday - Friday: 11am - 10pm</p>
            <p>Saturday - Sunday: 10am - 11pm</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-twitter"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Restaurant X. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;