import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StaffDetail = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [staff, setstaff] = useState([]);
  const [category, setCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch staffs from the backend
    fetch("http://localhost:3000/staff")
      .then((response) => response.json())
      .then((data) => {
        setstaff(data);
        setResults(data); // Initialize results with all staffs
        setIsLoading(false);
      })

      .catch((err) => console.error("Error fetching Staff:", err));
      setIsLoading(false);
    }, []);

  // const handleSearch = (value) => {
  //   setInput(value);
  //   const filteredResults = staffs.filter((staff) =>
  //     staff.Name.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setResults(filteredResults);
  // };

  const handleSearch = (value) => {
    setInput(value);
    const searchValue = value.toLowerCase();
    const filteredResults = staff.filter((staff) => {
      if (category === "All") {
        return (
          staff.Name.toLowerCase().includes(searchValue) ||
          staff.ContactDetails?.toLowerCase().includes(searchValue) ||
          staff.Role?.toLowerCase().includes(searchValue)||
          staff.ShiftTiming?.toLowerCase().includes(searchValue)
        );
      } else if (category === "Name") {
        return staff.Name.toLowerCase().includes(searchValue);
      } else if (category === "ContactDetails") {
        return staff.ContactDetails?.toLowerCase().includes(searchValue);
      } else if (category === "Role") {
        return staff.Role?.toLowerCase().includes(searchValue);
      } else if (category === "ShiftTiming") {
        return staff.ShiftTiming?.toLowerCase().includes(searchValue);
      }
      return false;
    });
    setResults(filteredResults);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setInput("");
    setResults(staff); // Reset results when changing category
  };

  const handleItemClick = (staff) => {
    navigate(`staff/${staff.StaffID}`, { state: staff });
  };

  const roleOptions = ["Manager", "Chef", "Waiter", "Cleaner", "Supervisor"];
const shiftOptions = [
  "7 AM - 3 PM",
  "8 AM - 4 PM",
  "9 AM - 5 PM",
  "10 AM - 6 PM",
  "11 AM - 7 PM"
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
            <h1>Staff Directory</h1>
            <p className="subtitle">Manage and explore your staff database</p>
            <div className="search-tools">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="🔍 Search staff..."
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
                <option value="ContactDetails">Email</option>
                <option value="Role">Role</option>
                <option value="ShiftTiming">Shift Time</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading Staff...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="cards-grid">
              {results.map((staff) => (
                <div
                  key={staff.StaffID}
                  className="staff-card"
                  onClick={() => handleItemClick(staff)}
                >
                  <div className="card-header">
                    <div className="profile-image">
                      {staff.ProfilePicture ? (
                        <img src={staff.ProfilePicture} alt={staff.Name} />
                      ) : (
                        <div className="profile-placeholder">
                          {staff.Name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h2>{staff.Name}</h2>
                  </div>
                  <div className="card-content">
                    {staff.ContactDetails && (
                      <div className="info-row">
                        <span className="icon">📧</span>
                        <span>{staff.ContactDetails}</span>
                      </div>
                    )}
                    {staff.Role && (
                      <div className="info-row">
                        <span className="icon">💼</span>
                        <span>{staff.Role}</span>
                      </div>
                    )}
                    {staff.ShiftTiming && (
                      <div className="info-row">
                        <span className="icon">⌚</span>
                        <span>{staff.ShiftTiming}</span>
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
              <p>No Staff found matching your search.</p>
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

export default StaffDetail;

