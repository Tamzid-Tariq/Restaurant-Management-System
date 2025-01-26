import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import './Home.css'; // Import the CSS file

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((response) => response.json())
      .then((data) => {
        // Map data to include full image URLs
        const menuWithImages = data.map((item) => ({
          ...item,
          ImageURL: item.Image
            ? `http://localhost:3000/uploads/${item.Image}`
            : "/default-dish.png",
          Price: Number(item.Price) || 0,
          Name: item.Name,
        }));
        console.log(menuWithImages); // Debugging line to check the data
        setMenuItems(menuWithImages);
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  return (
    <div>
      <header className="header">
        <div className="button-container register-button">
          <RegisterButton />
        </div>
        <div className="button-container login-button">
          <LoginButton />
        </div>
      </header>
      <h1 style={{ textAlign: 'center', backgroundColor: 'blue', color: 'white', width: '100%', padding: '20px 0', marginTop: '200px' }}>
        Welcome to Restaurant X
      </h1>
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Here's our menu</h2>
      <Menu items={menuItems} />
    </div>
  );
};

export default Home;