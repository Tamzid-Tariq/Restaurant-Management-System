// Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    Name: "",
    Image: "",
    Email: "",
    ContactNumber: "",
    // TotalSpending: "",
    Password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setError("File is too large. Please choose an image under 5MB.");
        return;
      }
      setFormData(prevState => ({
        ...prevState,
        Image: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const submitFormData = new FormData();
      Object.keys(formData).forEach(key => {
        submitFormData.append(key, formData[key]);
      });

      const response = await axios.post('http://localhost:3000/addcustomer', submitFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.Status === "Success") {
        alert("Registration successful!");
        navigate('/login');
      } else {
        setError(response.data.Error || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.Error || "An error occurred during registration");
    }
  };

  return (
    <div className="register-page">
      <h1 className="site-title">Restaurant Management System</h1>
      
      <div className="register-form-container">
        <div className="register-header">
          <h2>Create Account</h2>
          <p>Join us to start ordering delicious meals</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="profile-image-section">
            <div className="profile-image-container">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" />
              ) : (
                <div className="profile-placeholder">
                  <i className="bi bi-person-circle"></i>
                </div>
              )}
            </div>
            <label className="image-upload-btn">
              <i className="bi bi-camera"></i> Choose Profile Photo
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="Name">Full Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                id="Password"
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
                required
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ContactNumber">Phone Number</label>
              <input
                type="tel"
                id="ContactNumber"
                name="ContactNumber"
                value={formData.ContactNumber}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

          </div>

          <div className="form-footer">
            <div className="terms-check">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the Terms & Conditions
              </label>
            </div>

            <button type="submit" className="register-btn">
              Create Account
            </button>

            <p className="login-link">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;