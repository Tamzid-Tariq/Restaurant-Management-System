import React, { useState } from "react";

const ManageStaff = () => {
  const [data, setData] = useState({
    Name: "",
    Image: "",
    ContactDetails: "",
    Role: "",
    ShiftTiming: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, Image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "Image") {
          formData.append("image", data[key]); // Change 'Image' to 'image'
        } else {
          formData.append(key, data[key]);
        }
      });
      await fetch("http://localhost:3000/addstaff", {
        method: "POST",
        body: formData,
      });
      setSuccess(true);
      setData({
        Name: "",
        Image: "",
        ContactDetails: "",
        Role: "",
        ShiftTiming: "",
      });
      setPreview("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
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
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              <div className="card-body p-4 p-md-5">
                <h2
                  className="text-center mb-4"
                  style={{
                    color: "#fff",
                    fontSize: "2.5rem",
                    fontWeight: "600",
                    fontFamily: "'Playfair Display', serif",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    borderBottom: "2px solid rgba(255, 215, 0, 0.5)",
                    paddingBottom: "15px",
                  }}
                >
                  Add Valued Staff
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="text-center mb-5">
                    <div
                      style={{
                        width: "150px",
                        height: "150px",
                        margin: "0 auto",
                        borderRadius: "50%",
                        border: "3px solid rgba(255, 215, 0, 0.5)",
                        overflow: "hidden",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        background: "rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="Preview"
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

                    <div className="mt-3">
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
                  </div>

                  <div className="row g-4">
                    {["Name", "ContactDetails", "Role", "ShiftTiming"].map(
                      (field, index) => (
                        <div
                          className={
                            field === "Password" ? "col-12" : "col-md-6"
                          }
                          key={index}
                        >
                          <div className="form-group">
                            <label
                              className="text-light mb-2"
                              style={{
                                fontSize: "0.9rem",
                                letterSpacing: "0.5px",
                                opacity: "0.9",
                              }}
                            >
                              <i
                                className={`bi bi-${
                                  field === "Name"
                                    ? "person"
                                    : field === "ContactDetails"
                                    ? "envelope"
                                    : field === "Role"
                                    ? "person-badge"
                                    : field === "ShiftTiming"
                                    ? "clock"
                                    : "lock"
                                } me-2`}
                              ></i>
                              {field}
                            </label>
                            {field === "Role" ? (
                              <select
                                className="form-control"
                                value={data[field]}
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    [field]: e.target.value,
                                  })
                                }
                                style={{
                                  background: "rgba(255, 255, 255, 0.1)",
                                  border: "1px solid rgba(255, 255, 255, 0.2)",
                                  borderRadius: "10px",
                                  color: "#fff",
                                  padding: "12px",
                                  transition: "all 0.3s ease",
                                  backdropFilter: "blur(5px)",
                                  WebkitAppearance: "none",
                                  MozAppearance: "none",
                                  appearance: "none",
                                }}
                              >
                                <option
                                  value=""
                                  style={{
                                    backgroundColor: "rgba(1, 32, 93, 0.9)",
                                    color: "#fff",
                                    padding: "12px",
                                  }}
                                >
                                  Select Role
                                </option>
                                <option
                                  value="Manager"
                                  style={{
                                    backgroundColor: "rgba(1, 32, 93, 0.9)",
                                    color: "#fff",
                                    padding: "12px",
                                  }}
                                >
                                  Manager
                                </option>
                                <option
                                  value="Chef"
                                  style={{
                                    backgroundColor: "rgba(1, 32, 93, 0.9)",
                                    color: "#fff",
                                    padding: "12px",
                                  }}
                                >
                                  Chef
                                </option>
                                <option
                                  value="Waiter"
                                  style={{
                                    backgroundColor: "rgba(1, 32, 93, 0.9)",
                                    color: "#fff",
                                    padding: "12px",
                                  }}
                                >
                                  Waiter
                                </option>
                                <option
                                  value="Cleaner"
                                  style={{
                                    backgroundColor: "rgba(1, 32, 93, 0.9)",
                                    color: "#fff",
                                    padding: "12px",
                                  }}
                                >
                                  Cleaner
                                </option>
                                <option
                                  value="Supervisor"
                                  style={{
                                    backgroundColor: "rgba(1, 32, 93, 0.9)",
                                    color: "#fff",
                                    padding: "12px",
                                  }}
                                >
                                  Supervisor
                                </option>
                              </select>
                            ) : field === "ShiftTiming" ? (
                              <select
                                className="form-control"
                                value={data[field]}
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    [field]: e.target.value,
                                  })
                                }
                                style={{
                                  background: "rgba(255, 255, 255, 0.1)",
                                  border: "1px solid rgba(255, 255, 255, 0.2)",
                                  borderRadius: "10px",
                                  color: "#fff",
                                  padding: "12px",
                                  transition: "all 0.3s ease",
                                  backdropFilter: "blur(5px)",
                                  WebkitAppearance: "none",
                                  MozAppearance: "none",
                                  appearance: "none",
                                }}
                              >
                                <option
                                  value=""
                                  style={{
                                    backgroundColor: "rgba(1, 32, 93, 0.9)",
                                    color: "#fff",
                                    padding: "12px",
                                  }}
                                >
                                  Select Shift Timing
                                </option>
                                <option
                                  value="7 AM - 3 PM"
                                  style={{
                                    backgroundColor: "rgba(1, 32, 93, 0.9)",
                                    color: "#fff",
                                    padding: "12px",
                                  }}
                                >
                                  7 AM - 3 PM
                                </option>
                                <option
                                  value="8 AM - 4 PM"
                                  style={{
                                    backgroundColor: "rgba(1, 32, 93, 0.9)",
                                    color: "#fff",
                                    padding: "12px",
                                  }}
                                >
                                  8 AM - 4 PM
                                </option>
                                <option
                                  value="9 AM - 5 PM"
                                  style={{
                                    backgroundColor: "rgba(1, 32, 93, 0.9)",
                                    color: "#fff",
                                    padding: "12px",
                                  }}
                                >
                                  9 AM - 5 PM
                                </option>
                                <option
                                  value="10 AM - 6 PM"
                                  style={{
                                    backgroundColor: "rgba(1, 32, 93, 0.9)",
                                    color: "#fff",
                                    padding: "12px",
                                  }}
                                >
                                  10 AM - 6 PM
                                </option>
                                <option
                                  value="11 AM - 7 PM"
                                  style={{
                                    backgroundColor: "rgba(1, 32, 93, 0.9)",
                                    color: "#fff",
                                    padding: "12px",
                                  }}
                                >
                                  11 AM - 7 PM
                                </option>
                              </select>
                            ) : (
                              <input
                                type="text"
                                className="form-control"
                                placeholder={`Enter ${field.toLowerCase()}`}
                                value={data[field.replace(/\s+/g, "")]}
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    [field.replace(/\s+/g, "")]: e.target.value,
                                  })
                                }
                                style={{
                                  background: "rgba(255, 255, 255, 0.1)",
                                  border: "1px solid rgba(255, 255, 255, 0.2)",
                                  borderRadius: "10px",
                                  color: "#fff",
                                  padding: "12px",
                                  transition: "all 0.3s ease",
                                  backdropFilter: "blur(5px)",
                                }}
                              />
                            )}

                            {/* <input
                            type={
                              field === "Password"
                                ? "password"
                                : field === "Email"
                                ? "email"
                                : "text"
                            }
                            className="form-control"
                            placeholder={`Enter ${field.toLowerCase()}`}
                            value={data[field.replace(/\s+/g, "")]}
                            onChange={(e) =>
                              setData({
                                ...data,
                                [field.replace(/\s+/g, "")]: e.target.value,
                              })
                            }
                            style={{
                              background: "rgba(255, 255, 255, 0.1)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                              borderRadius: "10px",
                              color: "#fff",
                              padding: "12px",
                              transition: "all 0.3s ease",
                              backdropFilter: "blur(5px)",
                            }}
                          /> */}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {success && (
                    <div
                      className="alert mt-4"
                      style={{
                        background: "rgba(25, 135, 84, 0.2)",
                        color: "#fff",
                        border: "1px solid rgba(25, 135, 84, 0.3)",
                        borderRadius: "10px",
                      }}
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Staff added successfully!
                    </div>
                  )}

                  <div className="text-center mt-5">
                    <button
                      type="submit"
                      className="btn"
                      disabled={loading}
                      style={{
                        background: "rgba(255, 215, 0, 0.2)",
                        color: "#fff",
                        border: "1px solid rgba(255, 215, 0, 0.5)",
                        padding: "12px 40px",
                        borderRadius: "30px",
                        fontSize: "1.1rem",
                        transition: "all 0.3s ease",
                        minWidth: "200px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Adding...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-person-plus me-2"></i>
                          Add Staff
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStaff;
