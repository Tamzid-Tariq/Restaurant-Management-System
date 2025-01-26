import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Button.css'; // Import the CSS file

const RegisterButton = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="button-container">
      <button className="custom-button" onClick={() => setShowOptions(!showOptions)}>Register</button>
      {showOptions && (
        <div className="options-container vertical">
          <div className="option-button-container">
            <Link to="/register/admin" className="option-link">As Admin</Link>
          </div>
          <div className="option-button-container">
            <Link to="/register/customer" className="option-link">As Customer</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterButton;