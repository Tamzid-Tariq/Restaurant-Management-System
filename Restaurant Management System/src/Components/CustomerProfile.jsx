import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const { state: user } = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const navigate = useNavigate();
  const [User, setUser] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const customerId = Cookies.get("id");
        if (!customerId) {
          throw new Error("Customer ID not found in cookies");
        }

        const response = await fetch(
          `http://localhost:3000/customers/${customerId}`
        );
        if (!response.ok) {
          throw new Error("Customer not found");
        }
        const data = await response.json();
        setUser(data);
        setUpdatedUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleDelete = () => {
    const customerId = Cookies.get("id");
    fetch(`http://localhost:3000/deletecustomer/${customerId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.Status === "Success") {
          alert("Customer deleted successfully");
          navigate("/"); // Navigate back to the customer list page
        } else {
          alert("Error deleting customer");
        }
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
        alert("An error occurred while deleting the customer.");
      });
  };

  // Add image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      const customerId = Cookies.get("id");
      if (!customerId) {
        throw new Error("Customer ID is missing");
      }

      const formData = new FormData();
      formData.append("Name", updatedUser.Name);
      formData.append("Email", updatedUser.Email);
      formData.append("ContactNumber", updatedUser.ContactNumber);
      formData.append("TotalSpending", updatedUser.TotalSpending);

      if (newImage) {
        formData.append("Image", newImage);
      }

      const response = await fetch(
        `http://localhost:3000/api/customers/${customerId}`,
        {
          method: "PUT",
          body: formData, // Remove Content-Type header to let browser set it
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.Status === "Success") {
        alert("Customer updated successfully");
        setIsEditing(false);
        // Clear image states
        setNewImage(null);
        setImagePreview(null);
      } else {
        throw new Error(data.Message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      alert(`Update failed: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-9 col-lg-10">
            <div
              className="card"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
              }}
            >
              <div className="card-body p-4 p-md-5">
                <h2
                  className="text-center mb-4"
                  style={{
                    color: "#fff",
                    fontSize: "2.5rem",
                    fontWeight: "600",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    borderBottom: "2px solid rgba(255,215,0,0.5)",
                    paddingBottom: "15px",
                  }}
                >
                  Customer Details
                </h2>

                <div className="text-center mb-5">
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      margin: "0 auto",
                      borderRadius: "50%",
                      border: "3px solid rgba(255,215,0,0.5)",
                      overflow: "hidden",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                      transition: "all 0.3s ease",
                      background: "rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {imagePreview || (User && User.Image) ? (
                      <img
                        src={
                          imagePreview ||
                          `http://localhost:3000/uploads/${User.Image}`
                        }
                        alt="Profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    ) : (
                      <i
                        className="bi bi-person-circle"
                        style={{
                          fontSize: "4rem",
                          color: "rgba(255, 255, 255, 0.7)",
                        }}
                      ></i>
                    )}
                  </div>
                  {isEditing && (
                    <div className="mt-3 mb-4">
                      <label
                        className="btn"
                        style={{
                          background: "rgba(255, 215, 0, 0.2)",
                          color: "#fff",
                          border: "1px solid rgba(255, 215, 0, 0.5)",
                          padding: "8px 20px",
                          borderRadius: "25px",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                      >
                        <i className="bi bi-camera me-2"></i>
                        Choose Photo
                        <input
                          type="file"
                          className="d-none"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="row g-4">
                  {[
                    "Name",
                    "Email",
                    "ContactNumber",
                    "TotalSpending",
                    "CustomerID",
                  ].map((field) => (
                    <div className="col-md-6" key={field}>
                      <div className="form-group">
                        <label className="text-light mb-2">{field}</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name={field}
                            value={updatedUser ? updatedUser[field] : ""}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                          <div
                            style={{
                              background: "rgba(255,255,255,0.1)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              borderRadius: "10px",
                              padding: "12px",
                              color: "#fff",
                            }}
                          >
                            {User && User[field]}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {!isEditing ? (
                  <>
                    <button
                      onClick={handleDelete}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "20px",
                        marginLeft: "120px",
                        marginRight: "20px",
                      }}
                    >
                      Delete Profile
                    </button>

                    <button
                      onClick={() => setIsEditing(true)}
                      style={{
                        backgroundColor: "#FFA500", // Orange color
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "20px",
                        marginLeft: "120px",
                      }}
                    >
                      Update Profile
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleUpdate}
                    style={{
                      backgroundColor: "#4CAF50", // Green color
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginTop: "20px",
                      marginLeft: "300px",
                    }}
                  >
                    Update Customer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;


// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { useLocation, useNavigate } from "react-router-dom";
// import './CustomerProfile.css';

// const CustomerProfile = () => {
//   const { state: user } = useLocation();
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState(null);
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [newImage, setNewImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const customerId = Cookies.get("id");
//       if (!customerId) {
//         throw new Error("Customer ID not found in cookies");
//       }

//       const response = await fetch(`http://localhost:3000/customers/${customerId}`);
//       if (!response.ok) {
//         throw new Error("Customer not found");
//       }

//       const data = await response.json();
//       // Transform the data to include full image URL
//       const transformedData = {
//         ...data,
//         Image: data.Image ? `http://localhost:3000/uploads/${data.Image}` : null
//       };

//       setCurrentUser(transformedData);
//       setUpdatedUser(transformedData);
//       if (transformedData.Image) {
//         setImagePreview(transformedData.Image);
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete your profile?")) {
//       try {
//         const customerId = Cookies.get("id");
//         const response = await fetch(`http://localhost:3000/deleteCustomer/${customerId}`, {
//           method: "DELETE",
//         });
//         const data = await response.json();
        
//         if (data.Status === "Success") {
//           Cookies.remove("id");
//           alert("Profile deleted successfully");
//           navigate("/");
//         } else {
//           throw new Error(data.Message || "Failed to delete profile");
//         }
//       } catch (error) {
//         console.error("Error deleting customer:", error);
//         alert("Failed to delete profile");
//       }
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5000000) { // 5MB limit
//         alert("File is too large. Please choose an image under 5MB.");
//         return;
//       }
//       setNewImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const customerId = Cookies.get("id");
//       if (!customerId) throw new Error("Customer ID is missing");

//       const formData = new FormData();
//       Object.keys(updatedUser).forEach(key => {
//         if (key !== 'Image') {
//           formData.append(key, updatedUser[key]);
//         }
//       });

//       if (newImage) {
//         formData.append("Image", newImage);
//       }

//       const response = await fetch(`http://localhost:3000/api/customers/${customerId}`, {
//         method: "PUT",
//         body: formData,
//       });

//       const data = await response.json();
      
//       if (data.Status === "Success") {
//         alert("Profile updated successfully");
//         setIsEditing(false);
//         fetchUser(); // Refresh user data
//       } else {
//         throw new Error(data.Message || "Update failed");
//       }
//     } catch (error) {
//       console.error("Error updating customer:", error);
//       alert(`Update failed: ${error.message}`);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedUser(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   if (isLoading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <h2 className="profile-title">Customer Profile</h2>
        
//         <div className="profile-image-section">
//           <div className="profile-image-container">
//             {imagePreview || (currentUser?.Image) ? (
//               <img
//                 src={imagePreview || currentUser.Image}
//                 alt="Profile"
//                 className="profile-image"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = '/default-avatar.png';
//                 }}
//               />
//             ) : (
//               <div className="profile-image-placeholder">
//                 {currentUser?.Name?.charAt(0) || '?'}
//               </div>
//             )}
//           </div>
          
//           {isEditing && (
//             <div className="image-upload-section">
//               <label className="upload-button">
//                 <i className="bi bi-camera"></i> Choose Photo
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   className="hidden-input"
//                 />
//               </label>
//             </div>
//           )}
//         </div>

//         <div className="profile-details">
//           {[
//             { key: 'Name', label: 'Name' },
//             { key: 'Email', label: 'Email' },
//             { key: 'ContactNumber', label: 'Phone Number' },
//             { key: 'TotalSpending', label: 'Total Spending' },
//             { key: 'CustomerID', label: 'Customer ID' }
//           ].map(({ key, label }) => (
//             <div className="detail-group" key={key}>
//               <label className="detail-label">{label}</label>
//               {isEditing && key !== 'CustomerID' ? (
//                 <input
//                   type="text"
//                   name={key}
//                   value={updatedUser?.[key] || ''}
//                   onChange={handleInputChange}
//                   className="detail-input"
//                 />
//               ) : (
//                 <div className="detail-value">
//                   {currentUser?.[key] || 'N/A'}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="profile-actions">
//           {!isEditing ? (
//             <>
//               <button 
//                 onClick={handleDelete} 
//                 className="action-button delete"
//               >
//                 Delete Profile
//               </button>
//               <button 
//                 onClick={() => setIsEditing(true)} 
//                 className="action-button edit"
//               >
//                 Update Profile
//               </button>
//             </>
//           ) : (
//             <button 
//               onClick={handleUpdate} 
//               className="action-button save"
//             >
//               Save Changes
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerProfile;