import React from 'react';
import './Menu.css'; // Import the CSS file

const Menu = ({ items }) => {
  const categories = [...new Set(items.map(item => item.category))];

  return (
    <div className="menu-container">
      {categories.map(category => (
        <div key={category} className="menu-category">
          <h3 className="category-title">{category}</h3>
          <ul className="menu-list">
            {items.filter(item => item.category === category).map(item => (
              <li key={item.id} className="menu-item">
                <img src={item.ImageURL} alt={item.name} className="menu-item-image" />
                <div className="menu-item-details">
                  <div className="item-name">{item.name}</div>
                  <p>${item.Price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Menu;