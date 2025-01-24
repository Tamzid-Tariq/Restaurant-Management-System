import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  
  const [updatedOrder, setUpdatedOrder] = useState({
    OrderType: "",
    Status: "",
    TotalAmount: "",
  })

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/order/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();
        if (data.Status === "Error") {
          throw new Error(data.Message || "Error fetching order details");
        }
        setOrderDetails(data.OrderDetails);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      const data = await response.json();
      if (data.Status === "Success") {
        alert("Order updated successfully");
        window.location.reload();
      } else {
        throw new Error(data.Message || "Failed to update order");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/order/${id}`, { method: "DELETE" });
        const data = await response.json();
        if (data.Status === "Success") {
          alert("Order deleted successfully");
          navigate("/orders");
        } else {
          throw new Error(data.Message || "Failed to delete order");
        }
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  };
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!orderDetails) {
    return <div className="loading-message">Loading order details...</div>;
  }

  const { OrderID, CustomerName, TotalAmount, Items } = orderDetails;

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
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    borderBottom: "2px solid rgba(255, 215, 0, 0.5)",
                    paddingBottom: "15px",
                  }}
                >
                  Order Details
                </h2>
                <div className="order-summary mb-5">
                  <p style={{ color: "#fff", fontSize: "1.2rem" }}>
                    <strong>Order ID:</strong> {OrderID}
                  </p>
                  <p style={{ color: "#fff", fontSize: "1.2rem" }}>
                    <strong>Customer Name:</strong> {CustomerName}
                  </p>
                  <p style={{ color: "#fff", fontSize: "1.2rem" }}>
                    <strong>Total Amount:</strong> ${TotalAmount}
                  </p>
                </div>
                <h3
                  style={{
                    color: "#FFD700",
                    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                    borderBottom: "2px solid rgba(255, 215, 0, 0.5)",
                    paddingBottom: "10px",
                  }}
                >
                  Items Ordered
                </h3>
                <div className="items-list mt-4">
                  {Items.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "10px",
                        padding: "10px 15px",
                        marginBottom: "15px",
                        color: "#fff",
                      }}
                    >
                      <p>
                        <strong>Item:</strong> {item.MenuItemName}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.Quantity}
                      </p>
                      <p>
                        <strong>Price:</strong> ${item.ItemPrice}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => window.history.back()}
                  style={{
                    backgroundColor: "#FFA500",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "20px",
                  }}
                >
                  Go Back
                </button>

                {/* <button
                  onClick={handleUpdate}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "20px",
                    marginRight: "10px",
                  }}
                >
                  Update Order
                </button> */}
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
                    marginLeft:"30px"
                  }}
                >
                  Delete Order
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
