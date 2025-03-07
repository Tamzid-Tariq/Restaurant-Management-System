import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Button.css'; // Import the CSS file

const LoginButton = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="button-container">
      <button className="custom-button" onClick={() => setShowOptions(!showOptions)}>Login</button>
      {showOptions && (
        <div className="options-container vertical">
          <div className="option-button-container">
            <Link to="/adminlogin" className="option-link">As Admin</Link>
          </div>
          <div className="option-button-container">
            <Link to="/customerlogin" className="option-link">As Customer</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;