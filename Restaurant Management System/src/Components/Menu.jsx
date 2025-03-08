// import React from 'react';
// import './Menu.css'; // Import the CSS file

// const Menu = ({ items }) => {
//   const categories = [...new Set(items.map(item => item.category))];

//   return (
//     <div className="menu-container">
//       {categories.map(category => (
//         <div key={category} className="menu-category">
//           <h3 className="category-title">{category}</h3>
//           <ul className="menu-list">
//             {items.filter(item => item.category === category).map(item => (
//               <li key={item.id} className="menu-item">
//                 <img src={item.ImageURL} alt={item.name} className="menu-item-image" />
//                 <div className="menu-item-details">
//                   <div className="item-name">{item.name}</div>
//                   <p>${item.Price.toFixed(2)}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Menu;

// Menu.jsx
import React from 'react';
import './Menu.css';
import { FaShoppingCart } from 'react-icons/fa';

const Menu = ({ items }) => {
  const categories = [...new Set(items.map(item => item.category))];

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>Our Delicious Menu</h2>
        <p>Discover our carefully curated selection of dishes</p>
      </div>
      
      <div className="categories-wrapper">
        {categories.map(category => (
          <div key={category} className="menu-category">
            <div className="category-header">
              <h3 className="category-title">{category}</h3>
              <div className="category-divider"></div>
            </div>
            
            <div className="menu-list">
              {items
                .filter(item => item.category === category)
                .map(item => (
                  <div key={item.id} className="menu-item">
                    <div className="menu-item-image-wrapper">
                      <img src={item.ImageURL} alt={item.name} className="menu-item-image" />
                      <div className="menu-item-overlay">
                        <button className="add-to-cart-btn">
                          <FaShoppingCart /> Add to Cart
                        </button>
                      </div>
                    </div>
                    <div className="menu-item-details">
                      <h4 className="item-name">{item.Name}</h4>
                      <p className="item-description">{item.description || 'A delicious dish prepared with the finest ingredients'}</p>
                      <div className="item-footer">
                        <span className="item-price">${item.Price.toFixed(2)}</span>
                        <div className="item-badges">
                          {item.Category==="Main Course" && <span className="badge spicy">Main Course</span>}
                          {item.Category==="Appetizer" && <span className="badge spicy">Appetizer</span>}
                          {item.Category==="Dessert" && <span className="badge spicy">Dessert</span>}
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;