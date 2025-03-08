import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MenuDetail = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    
    fetch("http://localhost:3000/menu")
      .then((response) => response.json())
      .then((data) => {
        setMenu(data);
        setResults(data); 
        setIsLoading(false);
      })

      .catch((err) => console.error("Error fetching Menu:", err));
      setIsLoading(false);
    }, []);

  
  const handleSearch = (value) => {
    setInput(value);
    const searchValue = value.toLowerCase();
    const filteredResults = menu.filter((item) => {
      if (category === "All") {
        return (
          item.Name.toLowerCase().includes(searchValue) ||
          item.Category?.toLowerCase().includes(searchValue) ||
          item.Price.toString().includes(searchValue) ||
          (item.Availability ? "Available" : "Unavailable")
            .toLowerCase()
            .includes(searchValue)
        );
      } else if (category === "Name") {
        return item.Name.toLowerCase().includes(searchValue);
      } else if (category === "Category") {
        return item.Category?.toLowerCase().includes(searchValue);
      } else if (category === "Price") {
        return item.Price.toString().includes(searchValue);
      } else if (category === "Availability") {
        return (item.Availability ? "Available" : "Unavailable")
          .toLowerCase()
          .includes(searchValue);
      }
      return false;
    });
    setResults(filteredResults);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setInput("");
    setResults(menu); // Reset results when changing category
  };

  const handleItemClick = (item) => {
    navigate(`menu/${menu.MenuID}`, { state: item });
  };

  const CategoryOptions = ["Main Course", "Appetizer", "Dessert"];
const AvailabilityOptions = [
  "Available",
  "Unavailable"
];

 const renderSearchInput = () => {
    if (category === "Role") {
      return (
        <select
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            color: "#fff",
            padding: "12px",
            width: "100%"
          }}
        >
          <option value="">Select Role</option>
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      );
    } else if (category === "ShiftTiming") {
      return (
        <select
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            color: "#fff",
            padding: "12px",
            width: "100%"
          }}
        >
          <option value="">Select Shift</option>
          {shiftOptions.map((shift) => (
            <option key={shift} value={shift}>
              {shift}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          type="text"
          placeholder={`Search by ${category}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            color: "#fff",
            padding: "12px",
            width: "100%"
          }}
        />
      );
    }
  };
  return (
    <div className="search-container">
      <div className="background-overlay">
        <div className="content-wrapper">
          <div className="search-header">
            <h1>Menu Directory</h1>
            <p className="subtitle">Manage and explore your Menu database</p>
            <div className="search-tools">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="🔍 Search Menu..."
                  value={input}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="search-input"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="category-select"
              >
                <option value="All">All Categories</option>
                <option value="Name">Name</option>
                <option value="Category">Category</option>
                <option value="Price">Price</option>
                <option value="Availability">Availability</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading Menu...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="cards-grid">
              {results.map((item) => (
                <div
                  key={item.MenuID}
                  className="staff-card"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="card-header">
                    <div className="profile-image">
                      {item.ProfilePicture ? (
                        <img src={item.Image} alt={item.Name} />
                      ) : (
                        <div className="profile-placeholder">
                          {item.Name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h2>{item.Name}</h2>
                  </div>
                  <div className="card-content">
                    {item.Category && (
                      <div className="info-row">
                        <span className="icon">🍽</span>
                        <span>{item.Category}</span>
                      </div>
                    )}
                    {item.Price && (
                      <div className="info-row">
                        <span className="icon">💲</span>
                        <span>{item.Price}</span>
                      </div>
                    )}
                    {item.Availability && (
                      <div className="info-row">
                        <span className="icon">🥂</span>
                        <span>{item.Availability===0?"Unavailable":"Available"}</span>
                      </div>
                    )}
                  </div>
                  <div className="card-footer">
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No Menu found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .search-container {
          min-height: 100vh;
          background: #000000;
          background-image: 
            linear-gradient(45deg, rgba(26, 32, 44, 0.6) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(26, 32, 44, 0.6) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(26, 32, 44, 0.6) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(26, 32, 44, 0.6) 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          position: relative;
        }

        .background-overlay {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.97) 0%, rgba(0, 0, 0, 0.95) 100%);
          min-height: 100vh;
          padding: 2rem;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .search-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .search-header h1 {
          font-size: 2.8rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .subtitle {
          color: #a0aec0;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .search-tools {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .search-input-wrapper {
          flex: 1;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1.5rem;
          border: 2px solid #2d3748;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: rgba(45, 55, 72, 0.5);
          color: #ffffff;
        }

        .search-input:focus {
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
          outline: none;
          background: rgba(45, 55, 72, 0.8);
        }

        .search-input::placeholder {
          color: #a0aec0;
        }

        .category-select {
          padding: 0.5rem 1rem;
          border: 2px solid #2d3748;
          border-radius: 12px;
          background: rgba(45, 55, 72, 0.5);
          min-width: 150px;
          font-size: 1rem;
          cursor: pointer;
          color: #ffffff;
        }

        .category-select:focus {
          border-color: #4299e1;
          outline: none;
        }

        .category-select option {
          background: #1a202c;
          color: #ffffff;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          padding: 1rem 0;
        }

        .staff-card {
          background: rgba(26, 32, 44, 0.8);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid #2d3748;
          backdrop-filter: blur(10px);
        }

        .staff-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          background: rgba(26, 32, 44, 0.9);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .profile-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
        }

        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #4299e1, #667eea);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .card-header h2 {
          font-size: 1.25rem;
          color: #ffffff;
          font-weight: 600;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: #a0aec0;
        }

        .icon {
          font-size: 1.2rem;
        }

        .card-footer {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #2d3748;
        }

        .view-details-btn {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #4299e1, #667eea);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-details-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
        }

        .loading-state {
          text-align: center;
          padding: 3rem;
          color: #a0aec0;
        }

        .loading-spinner {
          border: 4px solid #2d3748;
          border-top: 4px solid #4299e1;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #a0aec0;
        }
      `}</style>
    </div>
  );
};

export default MenuDetail;

