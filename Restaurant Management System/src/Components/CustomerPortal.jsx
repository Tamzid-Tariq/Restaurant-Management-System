// CustomerPortal.jsx
import React, { useState, useEffect } from 'react';
import { FaHistory, FaCalendarAlt, FaStar, FaUser, FaCrown, FaReceipt } from 'react-icons/fa';
import Cookies from 'js-cookie';
import './CustomerPortal.css';

const CustomerPortal = () => {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomerData();
    fetchOrders();
    fetchReservations();
  }, []);

  const fetchCustomerData = async () => {
    const customerId = Cookies.get("id");
    if (!customerId) {
      setError("No customer ID found");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/customers/${customerId}`);
      const data = await response.json();
      
      if (response.ok) {
        setCustomer(data);
      } else {
        setError(data.Error || "Failed to fetch customer data");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Error fetching customer:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    const customerId = Cookies.get("id");
    if (!customerId) return;

    try {
      const response = await fetch(`http://localhost:3000/customers/${customerId}/orders`);
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const fetchReservations = async () => {
    const customerId = Cookies.get("id");
    if (!customerId) return;

    try {
      const response = await fetch(`http://localhost:3000/customers/${customerId}/reservations`);
      const data = await response.json();
      if (response.ok) {
        setReservations(data);
      }
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading customer information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={fetchCustomerData}>Try Again</button>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="error-container">
        <p>No customer data found</p>
      </div>
    );
  }

  return (
    <div className="customer-portal">
      {/* Header Section */}
      <div className="portal-header">
        <div className="customer-profile">
          <div className="profile-image">
            <img 
              src={customer.Image || '/default-avatar.png'} 
              alt={customer.Name} 
            />
          </div>
          <div className="profile-info">
            <h1>{customer.Name}</h1>
            <p>{customer.Email}</p>
            {customer.IsPremium && (
              <span className="premium-badge">
                <FaCrown /> Premium Member
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <FaReceipt className="stat-icon" />
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p>{orders.length}</p>
          </div>
        </div>
        {/* <div className="stat-card">
          <FaStar className="stat-icon" />
          <div className="stat-content">
            <h3>Loyalty Points</h3>
            <p>{customer.LoyaltyPoints || 0}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaUser className="stat-icon" />
          <div className="stat-content">
            <h3>Member Since</h3>
            <p>{new Date(customer.JoinDate).toLocaleDateString()}</p>
          </div>
        </div> */}
        <div className="stat-card">
            <FaCalendarAlt className="stat-icon" />
            <div className="stat-content">
                <h3>Total Spent</h3>
                <p>${typeof customer.TotalSpending === 'number' 
                ? customer.TotalSpending.toFixed(2) 
                : Number(customer.TotalSpending || 0).toFixed(2)}</p>
            </div>
            </div>
      </div>

      {/* Main Content Tabs */}
      <div className="portal-content">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
          <button 
            className={`tab ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            Reservations
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <h2>Account Overview</h2>
              <div className="account-details">
                <div className="detail-group">
                  <h3>Personal Information</h3>
                  <p><strong>Name:</strong> {customer.Name}</p>
                  <p><strong>Email:</strong> {customer.Email}</p>
                  <p><strong>Phone:</strong> {customer.ContactNumber}</p>
                  <p><strong>Member Status:</strong> {customer.TotalSpending>500 ? 'Premium' : 'Regular'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-section">
              <h2>Order History</h2>
              <div className="orders-list">
                {orders.length > 0 ? (
                  orders.map(order => (
                    <div key={order.OrderID} className="order-card">
                      <div className="order-header">
                        <h3>Order #{order.OrderID}</h3>
                        <span className={`order-status ${order.Status.toLowerCase()}`}>
                          {order.Status}
                        </span>
                      </div>
                      <div className="order-details">
                        <p><strong>Date:</strong> {new Date(order.OrderDate).toLocaleDateString()}</p>
                        {/* <p><strong>Total:</strong> ${order.TotalAmount.toFixed(2)}</p> */}
                        <p>${typeof order.TotalAmount === 'number' 
                            ? order.TotalAmount.toFixed(2) 
                            : Number(order.TotalAmount || 0).toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No orders found</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reservations' && (
            <div className="reservations-section">
              <h2>Reservation History</h2>
              <div className="reservations-list">
                {reservations.length > 0 ? (
                  reservations.map(reservation => (
                    <div key={reservation.ReservationID} className="reservation-card">
                      <div className="reservation-header">
                        <h3>Reservation #{reservation.ReservationID}</h3>
                        <span className={`reservation-status ${reservation.Status.toLowerCase()}`}>
                          {reservation.Status}
                        </span>
                      </div>
                      <div className="reservation-details">
                        <p><strong>Date:</strong> {new Date(reservation.ReservationDate).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {reservation.ReservationTime}</p>
                        <p><strong>Guests:</strong> {reservation.NumberOfGuests}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No reservations found</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;