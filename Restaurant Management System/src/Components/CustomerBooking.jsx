import React, { useState } from "react";
import Cookies from "js-cookie";

const CustomerBooking = () => {
  const [data, setData] = useState({
    CustomerID: Cookies.get("id") || "",
    ReservationDate: "",
    ReservationTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setData({
          CustomerID: Cookies.get("id") || "",
          ReservationDate: "",
          ReservationTime: "",
        });
      } else {
        setError(result.Message || "Failed to add reservation");
      }
    } catch (err) {
      setError("An error occurred while adding the reservation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('https://source.unsplash.com/featured/?restaurant')`,
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
                  Add New Reservation
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {[
                      { label: "Customer ID", name: "CustomerID", type: "text", readOnly: true },
                      { label: "Reservation Date", name: "ReservationDate", type: "date" },
                      { label: "Reservation Time", name: "ReservationTime", type: "time" },
                    ].map((field, index) => (
                      <div className="col-12" key={index}>
                        <div className="form-group">
                          <label
                            className="text-light mb-2"
                            style={{
                              fontSize: "0.9rem",
                              letterSpacing: "0.5px",
                              opacity: "0.9",
                            }}
                          >
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            className="form-control"
                            value={data[field.name]}
                            readOnly={field.readOnly}
                            onChange={(e) =>
                              setData({ ...data, [field.name]: e.target.value })
                            }
                            style={{
                              background: "rgba(255, 255, 255, 0.1)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                              borderRadius: "10px",
                              color: "#fff",
                              padding: "12px",
                              backdropFilter: "blur(5px)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
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
                      Reservation added successfully!
                    </div>
                  )}

                  {error && (
                    <div
                      className="alert mt-4"
                      style={{
                        background: "rgba(220, 53, 69, 0.2)",
                        color: "#fff",
                        border: "1px solid rgba(220, 53, 69, 0.3)",
                        borderRadius: "10px",
                      }}
                    >
                      <i className="bi bi-x-circle me-2"></i>
                      {error}
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
                        minWidth: "200px",
                      }}
                    >
                      {loading ? "Adding..." : "Add Reservation"}
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

export default CustomerBooking;