import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const MenuProfile = () => {
  const { state: item } = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [updateditem, setUpdateditem] = useState(item);
  const navigate = useNavigate();
  const [Item, setitem] = useState(null);
  const { id } = useParams();
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/menu/${id}`
        );
        if (!response.ok) {
          throw new Error("Menu not found");
        }
        const data = await response.json();
        setitem(data);
      } catch (error) {
        console.error("Error fetching Menu:", error);
      }
    };

    if (id) {
      fetchMenu();
    }
  }, [id]);

//   const handleDelete = () => {
//     fetch(`http://localhost:3000/deleteStaff/${item.StaffID}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.Status === "Success") {
//           alert("Staff deleted successfully");
//           navigate("/"); // Navigate back to the staff list page
//         } else {
//           alert("Error deleting staff");
//         }
//       })
//       .catch((error) => {
//         console.error("Error deleting staff:", error);
//         alert("An error occurred while deleting the staff.");
//       });
//   };

const handleDelete = async () => {
    if (!item?.MenuID) {
        alert("Menu ID not found");
        return;
    }

    if (!window.confirm("Are you sure you want to delete this Menu Item?")) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/menu/${item.MenuID}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.Message || `HTTP error! status: ${response.status}`);
        }

        if (data.Status === "Success") {
            alert("Staff deleted successfully");
            navigate("/dashboard");
        } else {
            throw new Error(data.Message || "Failed to delete staff");
        }
    } catch (error) {
        console.error("Error deleting Menu:", error);
        alert(`Failed to delete Menu: ${error.message}`);
    }
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
      if (!item || !item.MenuID) {
        throw new Error("Menu ID is missing");
      }

      const formData = new FormData();
      formData.append("Name", updateditem.Name);
      formData.append("Category", updateditem.Category);
      formData.append("Price", updateditem.Price);
      formData.append("Availability", updateditem.Availability);
      formData.append("TimesOrdered", updateditem.TimesOrdered);

      if (newImage) {
        formData.append("Image", newImage);
      }

      const response = await fetch(
        `http://localhost:3000/api/menu/${item.MenuID}`,
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
        alert("Menu updated successfully");
        setIsEditing(false);
        // Clear image states
        setNewImage(null);
        setImagePreview(null);
      } else {
        throw new Error(data.Message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating staff:", error);
      alert(`Update failed: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateditem((prevState) => ({
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
                  Menu Details
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
                    {imagePreview || item.Image ? (
                      <img
                        src={
                          imagePreview ||
                          `http://localhost:3000/uploads/${item.Image}`
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
                    "Category",
                    "Price",
                    "Availability",
                    "TimesOrdered",
                  ].map((field) => (
                    <div className="col-md-6" key={field}>
                      <div className="form-group">
                        <label className="text-light mb-2">{field}</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name={field}
                            value={updateditem[field]}
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
                            {item[field]}
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
                      Delete Menu
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
                      Update Menu
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
                    Update Menu
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

export default MenuProfile;
