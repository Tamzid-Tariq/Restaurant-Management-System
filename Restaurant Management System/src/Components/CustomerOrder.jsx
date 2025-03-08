// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import {
//   Plus,
//   Minus,
//   ShoppingCart,
//   Calendar,
//   User,
//   Package,
//   CheckCircle,
// } from "lucide-react";

// const CustomerOrder = () => {
//   const [order, setOrder] = useState({
//     CustomerID: Cookies.get("id") || "",
//     OrderDate: "",
//     OrderType: "Dine In",
//     Status: "Pending",
//   });
//   const [menuItems, setMenuItems] = useState([]);
//   const [orderDetails, setOrderDetails] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [isOrderPlaced, setIsOrderPlaced] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:3000/menu")
//       .then((response) => response.json())
//       .then((data) => {
//         const menuWithImages = data.map((item) => ({
//           ...item,
//           ImageURL: item.Image
//             ? `http://localhost:3000/uploads/${item.Image}`
//             : "/default-dish.png",
//           Price: Number(item.Price) || 0,
//         }));
//         setMenuItems(menuWithImages);
//       })
//       .catch((error) => console.error("Error fetching menu:", error));
//   }, []);

//   const handleAddItem = (menuID, quantity) => {
//     const menuItem = menuItems.find((item) => item.MenuID === menuID);
//     if (!menuItem) return;

//     const existingItemIndex = orderDetails.findIndex(
//       (item) => item.menuID === menuID
//     );
//     let updatedOrderDetails = [...orderDetails];

//     if (existingItemIndex >= 0) {
//       const newQuantity =
//         updatedOrderDetails[existingItemIndex].quantity + quantity;
//       if (newQuantity <= 0) {
//         updatedOrderDetails.splice(existingItemIndex, 1);
//       } else {
//         updatedOrderDetails[existingItemIndex].quantity = newQuantity;
//       }
//     } else if (quantity > 0) {
//       updatedOrderDetails.push({
//         menuID: menuItem.MenuID,
//         name: menuItem.Name,
//         price: menuItem.Price,
//         quantity,
//         image: menuItem.Image,
//       });
//     }

//     setOrderDetails(updatedOrderDetails);
//     calculateTotal(updatedOrderDetails);
//   };

//   const calculateTotal = (details) => {
//     const total = details.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//     setTotalAmount(total);
//   };

//   const placeOrder = async () => {
//     if (!orderDetails.length) {
//       alert("Please add items to the order before placing!");
//       return;
//     }
//     setLoading(true);

//     try {
//       const orderResponse = await fetch("http://localhost:3000/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           CustomerID: order.CustomerID,
//           OrderDate: order.OrderDate,
//           OrderType: order.OrderType,
//           Status: order.Status,
//           TotalAmount: totalAmount,
//         }),
//       });

//       if (!orderResponse.ok) {
//         throw new Error("Failed to place order");
//       }

//       const orderData = await orderResponse.json();
//       const { OrderID } = orderData;

//       const formattedDetails = orderDetails.map((item) => ({
//         OrderID,
//         MenuID: item.menuID,
//         Quantity: item.quantity,
//         Price: item.price,
//       }));

//       const detailsResponse = await fetch(
//         "http://localhost:3000/orderdetails",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ details: formattedDetails, OrderID }),
//         }
//       );

//       if (!detailsResponse.ok) {
//         throw new Error("Failed to save order details");
//       }

//       setOrder({
//         CustomerID: Cookies.get("id") || "",
//         OrderDate: "",
//         OrderType: "Dine In",
//         Status: "Pending",
//       });
//       setOrderDetails([]);
//       setTotalAmount(0);
//       setIsOrderPlaced(true);
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Failed to place the order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="search-container">
//       <div className="background-overlay">
//         <div className="content-wrapper">
//           <div className="search-header">
//             <h1>Manage Orders</h1>
//             <p className="subtitle">Create and manage your orders</p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="staff-card">
//               <h2 className="section-title">Order Details</h2>
//               <div className="space-y-4">
//                 <div className="form-group">
//                   <label className="input-label">Customer ID</label>
//                   <input
//                     type="number"
//                     className="search-input"
//                     value={order.CustomerID}
//                     readOnly
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="input-label">Order Date</label>
//                   <input
//                     type="date"
//                     className="search-input"
//                     value={order.OrderDate}
//                     onChange={(e) =>
//                       setOrder({ ...order, OrderDate: e.target.value })
//                     }
//                     style={{
//                       background: "rgba(255, 255, 255, 0.1)",
//                       border: "1px solid rgba(255, 255, 255, 0.2)",
//                       borderRadius: "10px",
//                       color: "#fff",
//                       padding: "12px",
//                       width: "100%",
//                       cursor: "pointer",
//                       colorScheme: "dark",
//                     }}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="input-label">Order Type</label>
//                   <select
//                     className="category-select"
//                     value={order.OrderType}
//                     onChange={(e) =>
//                       setOrder({ ...order, OrderType: e.target.value })
//                     }
//                   >
//                     <option value="DineIn">Dine In</option>
//                     <option value="Takeout">Takeout</option>
//                     <option value="Delivery">Delivery</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//             <div className="md:col-span-2 staff-card">
//               <h2 className="section-title">Menu Items</h2>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(3, 1fr)",
//                   gap: "2rem",
//                   maxWidth: "800px",
//                   margin: "0 auto",
//                   padding: "1rem",
//                 }}
//               >
//                 {menuItems.map((item) => (
//                   <div key={item.MenuID} className="menu-item-card">
//                     {item.ImageURL && (
//                       <div
//                         className="menu-item-image"
//                         style={{
//                           width: "200px",
//                           height: "150px",
//                           overflow: "hidden",
//                           borderRadius: "10px",
//                           margin: "0 auto",
//                           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                         }}
//                       >
//                         <img
//                           src={item.ImageURL}
//                           alt={item.Name}
//                           onError={(e) => {
//                             e.target.src = "/default-dish.png";
//                           }}
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                             objectPosition: "center",
//                           }}
//                         />
//                       </div>
//                     )}
//                     <div
//                       className="menu-item-details"
//                       style={{
//                         width: "100%",
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                       }}
//                     >
//                       <div className="flex justify-between items-center mb-2">
//                         <h3 className="text-lg font-bold text-white">
//                           {item.Name}
//                         </h3>
//                         <span className="text-white font-semibold">
//                           ${(item.Price || 0).toFixed(2)}
//                         </span>
//                       </div>
//                       <p className="text-gray-400 text-sm mb-4">
//                         {item.Description}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                           <button
//                             onClick={() => handleAddItem(item.MenuID, -1)}
//                             className="quantity-btn"
//                           >
//                             <Minus className="w-5 h-5" />
//                           </button>
//                           <span className="text-white font-medium">
//                             {orderDetails.find(
//                               (detail) => detail.menuID === item.MenuID
//                             )?.quantity || 0}
//                           </span>
//                           <button
//                             onClick={() => handleAddItem(item.MenuID, 1)}
//                             className="quantity-btn"
//                           >
//                             <Plus className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="staff-card mt-8">
//             <h2 className="section-title">Order Summary</h2>
//             {orderDetails.length > 0 ? (
//               <div className="space-y-4">
//                 {orderDetails.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center text-white"
//                   >
//                     <span className="font-medium">
//                       {item.name} × {item.quantity}
//                     </span>
//                     <span className="text-gold">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 ))}
//                 <div className="border-t border-white/20 pt-4 mt-6">
//                   <div className="flex justify-between items-center text-xl font-bold text-white">
//                     <span>Total Amount</span>
//                     <span className="text-gold">${totalAmount.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-gray-400 text-center">No items in the order.</p>
//             )}
//             <button
//               className={`view-details-btn ${
//                 loading || !orderDetails.length ? "btn-disabled" : "btn-active"
//               }`}
//               onClick={placeOrder}
//               disabled={loading || !orderDetails.length}
//             >
//               {loading ? "Processing..." : "Place Order"}
//             </button>
//             {isOrderPlaced && (
//               <div className="order-success-message">
//                 <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
//                 Order placed successfully!
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//         .search-container {
//           min-height: 100vh;
//           background: #000000;
//           background-image: linear-gradient(
//               45deg,
//               rgba(26, 32, 44, 0.6) 25%,
//               transparent 25%
//             ),
//             linear-gradient(-45deg, rgba(26, 32, 44, 0.6) 25%, transparent 25%),
//             linear-gradient(45deg, transparent 75%, rgba(26, 32, 44, 0.6) 75%),
//             linear-gradient(-45deg, transparent 75%, rgba(26, 32, 44, 0.6) 75%);
//           background-size: 20px 20px;
//           background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
//           position: relative;
//         }
//         .background-overlay {
//           background: linear-gradient(
//             135deg,
//             rgba(0, 0, 0, 0.97) 0%,
//             rgba(0, 0, 0, 0.95) 100%
//           );
//           min-height: 100vh;
//           padding: 2rem;
//         }
//         .content-wrapper {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 2rem;
//         }
//         .search-header {
//           margin-bottom: 2rem;
//           text-align: center;
//         }
//         .search-header h1 {
//           font-size: 2.8rem;
//           color: #ffffff;
//           margin-bottom: 0.5rem;
//           font-weight: 700;
//           text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
//         }
//         .subtitle {
//           color: #a0aec0;
//           margin-bottom: 2rem;
//           font-size: 1.1rem;
//         }
//         .staff-card {
//           background: rgba(26, 32, 44, 0.8);
//           border-radius: 16px;
//           padding: 1.5rem;
//           transition: all 0.3s ease;
//           border: 1px solid #2d3748;
//           backdrop-filter: blur(10px);
//         }
//         .staff-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
//           background: rgba(26, 32, 44, 0.9);
//         }
//         .section-title {
//           color: #4299e1;
//           font-size: 1.8rem;
//           margin-bottom: 1.5rem;
//           border-bottom: 2px solid rgba(255, 215, 0, 0.3);
//           padding-bottom: 0.5rem;
//         }
//         .form-group {
//           margin-bottom: 1rem;
//         }
//         .input-label {
//           color: #a0aec0;
//           margin-bottom: 0.5rem;
//           display: block;
//         }
//         .search-input {
//           width: 100%;
//           padding: 1rem 1.5rem;
//           border: 2px solid #2d3748;
//           border-radius: 12px;
//           font-size: 1rem;
//           transition: all 0.3s ease;
//           background: rgba(45, 55, 72, 0.5);
//           color: #ffffff;
//         }
//         .search-input:focus {
//           border-color: #4299e1;
//           box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
//           outline: none;
//           background: rgba(45, 55, 72, 0.8);
//         }
//         .search-input::placeholder {
//           color: #a0aec0;
//         }
//         .category-select {
//           padding: 0.5rem 1rem;
//           border: 2px solid #2d3748;
//           border-radius: 12px;
//           background: rgba(45, 55, 72, 0.5);
//           min-width: 150px;
//           font-size: 1rem;
//           cursor: pointer;
//           color: #ffffff;
//         }
//         .category-select:focus {
//           border-color: #4299e1;
//           outline: none;
//         }
//         .menu-item-card {
//           background: rgba(40, 40, 40, 0.6);
//           border-radius: 6px;
//           overflow: hidden;
//           transition: transform 0.3s ease;
//         }
//         .menu-item-card:hover {
//           transform: scale(1.05);
//         }
//         .menu-item-image img {
//           width: 100%;
//           height: 150px;
//           object-fit: cover;
//         }
//         .menu-item-details {
//           padding: 1rem;
//         }
//         .quantity-btn {
//           background: rgba(255, 215, 0, 0.1);
//           border: 1px solid rgba(255, 215, 0, 0.3);
//           color: #4299e1;
//           padding: 0.5rem;
//           border-radius: 6px;
//           transition: all 0.3s ease;
//         }
//         .quantity-btn:hover {
//           background: rgba(255, 215, 0, 0.2);
//         }
//         .view-details-btn {
//           width: 100%;
//           padding: 1rem;
//           border-radius: 8px;
//           font-size: 1.1rem;
//           transition: all 0.3s ease;
//         }
//         .btn-active {
//           background: linear-gradient(135deg, #4299e1, #667eea);
//           color: white;
//           border: none;
//         }
//         .btn-disabled {
//           background: rgba(100, 100, 100, 0.3);
//           color: #666;
//           cursor: not-allowed;
//         }
//         .order-success-message {
//           background: rgba(20, 100, 50, 0.2);
//           color: #4ade80;
//           padding: 1rem;
//           border-radius: 8px;
//           text-align: center;
//           margin-top: 1rem;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CustomerOrder;

// CustomerOrder.jsx
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Plus, Minus, ShoppingCart, CheckCircle } from "lucide-react";
import './CustomerOrder.css';


const CustomerOrder = () => {
  const [order, setOrder] = useState({
    CustomerID: Cookies.get("id") || "",
    OrderDate: "",
    OrderType: "Dine In",
    Status: "Pending",
  });
  const [menuItems, setMenuItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((response) => response.json())
      .then((data) => {
        const menuWithImages = data.map((item) => ({
          ...item,
          ImageURL: item.Image
            ? `http://localhost:3000/uploads/${item.Image}`
            : "/default-dish.png",
          Price: Number(item.Price) || 0,
        }));
        setMenuItems(menuWithImages);
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  const handleAddItem = (menuID, quantity) => {
    const menuItem = menuItems.find((item) => item.MenuID === menuID);
    if (!menuItem) return;

    const existingItemIndex = orderDetails.findIndex(
      (item) => item.menuID === menuID
    );
    let updatedOrderDetails = [...orderDetails];

    if (existingItemIndex >= 0) {
      const newQuantity =
        updatedOrderDetails[existingItemIndex].quantity + quantity;
      if (newQuantity <= 0) {
        updatedOrderDetails.splice(existingItemIndex, 1);
      } else {
        updatedOrderDetails[existingItemIndex].quantity = newQuantity;
      }
    } else if (quantity > 0) {
      updatedOrderDetails.push({
        menuID: menuItem.MenuID,
        name: menuItem.Name,
        price: menuItem.Price,
        quantity,
        image: menuItem.Image,
      });
    }

    setOrderDetails(updatedOrderDetails);
    calculateTotal(updatedOrderDetails);
  };

  const calculateTotal = (details) => {
    const total = details.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  const placeOrder = async () => {
    if (!orderDetails.length) {
      alert("Please add items to the order before placing!");
      return;
    }
    setLoading(true);

    try {
      const orderResponse = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          CustomerID: order.CustomerID,
          OrderDate: order.OrderDate,
          OrderType: order.OrderType,
          Status: order.Status,
          TotalAmount: totalAmount,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to place order");
      }

      const orderData = await orderResponse.json();
      const { OrderID } = orderData;

      const formattedDetails = orderDetails.map((item) => ({
        OrderID,
        MenuID: item.menuID,
        Quantity: item.quantity,
        Price: item.price,
      }));

      const detailsResponse = await fetch(
        "http://localhost:3000/orderdetails",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ details: formattedDetails, OrderID }),
        }
      );

      if (!detailsResponse.ok) {
        throw new Error("Failed to save order details");
      }

      setOrder({
        CustomerID: Cookies.get("id") || "",
        OrderDate: "",
        OrderType: "Dine In",
        Status: "Pending",
      });
      setOrderDetails([]);
      setTotalAmount(0);
      setIsOrderPlaced(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="order-container">
      <div className="order-header">
        <h1>Place Your Order</h1>
        <p>Select from our delicious menu items</p>
      </div>

      <div className="order-content">
        <div className="order-details-section">
          <div className="order-form">
            <h2>Order Details</h2>
            <div className="form-group">
              <label>Order Date</label>
              <input
                type="date"
                value={order.OrderDate}
                onChange={(e) => setOrder({ ...order, OrderDate: e.target.value })}
                className="date-input"
              />
            </div>
            <div className="form-group">
              <label>Order Type</label>
              <select
                value={order.OrderType}
                onChange={(e) => setOrder({ ...order, OrderType: e.target.value })}
                className="type-select"
              >
                <option value="DineIn">Dine In</option>
                <option value="Takeout">Takeout</option>
                <option value="Delivery">Delivery</option>
              </select>
            </div>
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            {orderDetails.length > 0 ? (
              <>
                <div className="cart-items">
                  {orderDetails.map((item, index) => (
                    <div key={index} className="cart-item">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">×{item.quantity}</span>
                      </div>
                      <span className="item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>Total Amount</span>
                  <span className="total-price">${totalAmount.toFixed(2)}</span>
                </div>
                <button
                  className={`place-order-btn ${loading || !orderDetails.length ? 'disabled' : ''}`}
                  onClick={placeOrder}
                  disabled={loading || !orderDetails.length}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </>
            ) : (
              <div className="empty-cart">
                <ShoppingCart size={48} />
                <p>Your cart is empty</p>
              </div>
            )}
          </div>
        </div>

        <div className="menu-section">
          <h2>Menu Items</h2>
          <div className="menu-grid">
            {menuItems.map((item) => (
              <div key={item.MenuID} className="menu-card">
                <div className="menu-image">
                  <img
                    src={item.ImageURL}
                    alt={item.Name}
                    onError={(e) => {
                      e.target.src = "/default-dish.png";
                    }}
                  />
                </div>
                <div className="menu-info">
                  <h3>{item.Name}</h3>
                  <p className="price">${item.Price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleAddItem(item.MenuID, -1)}
                      className="quantity-btn"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity">
                      {orderDetails.find((detail) => detail.menuID === item.MenuID)
                        ?.quantity || 0}
                    </span>
                    <button
                      onClick={() => handleAddItem(item.MenuID, 1)}
                      className="quantity-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOrderPlaced && (
        <div className="success-message">
          <CheckCircle size={32} />
          <p>Order placed successfully!</p>
        </div>
      )}
    </div>
  );
};

export default CustomerOrder;