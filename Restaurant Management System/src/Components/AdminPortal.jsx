import React, { useState, useEffect } from 'react';
import { FaUtensils, FaUsers, FaClipboardList, FaChartLine } from 'react-icons/fa';
import axios from 'axios';
import './AdminPortal.css';

const AdminPortal = () => {
  const [statistics, setStatistics] = useState({
    TotalOrders: 0,
    TotalCustomers: 0,
    TotalReservations: 0,
    TotalRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [premiumCustomers, setPremiumCustomers] = useState([]);
  const [showPremiumCustomers, setShowPremiumCustomers] = useState(false);
  const [orderStats, setOrderStats] = useState(null);
  const [showOrderStats, setShowOrderStats] = useState(false);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/statistics');
      console.log('API Response:', response.data); // Debug log
      if (response.data.Status === "Success") {
        const stats = response.data.Statistics;
        console.log('Stats before processing:', stats); // Debug log
        setStatistics({
          ...stats,
          TotalRevenue: Number(stats.TotalRevenue) || 0
        });
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };
  const fetchPremiumCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/high-value-customers');
      setPremiumCustomers(response.data);
      setShowPremiumCustomers(true);
      setShowOrders(false); // Hide orders table if it's showing
      setShowOrderStats(false);
    } catch (error) {
      console.error('Error fetching premium customers:', error);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/complex-orders');
      setRecentOrders(response.data);
      setShowOrders(true);
      setShowPremiumCustomers(false); // Hide premium customers if they're showing
      setShowOrderStats(false);
    } catch (error) {
      console.error('Error fetching recent orders:', error);
    }
  };

  const fetchOrderStatistics = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/order-statistics');
      if (response.data.Status === "Success") {
        setOrderStats(response.data.Statistics);
        setShowOrderStats(true);
        setShowOrders(false);
        setShowPremiumCustomers(false);
      }
    } catch (error) {
      console.error('Error fetching order statistics:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Restaurant Dashboard</h1>
        <p>Welcome back, Admin</p>
      </header>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <FaUtensils className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p>{statistics.TotalOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <FaUsers className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Total Customers</h3>
            <p>{statistics.TotalCustomers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <FaClipboardList className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Total Reservations</h3>
            <p>{statistics.TotalReservations}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <FaChartLine className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p>${statistics.TotalRevenue?.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-button" onClick={fetchRecentOrders}>
            <FaUtensils /> Recent Orders
          </button>
          <button className="action-button" onClick={fetchOrderStatistics}>
            <FaChartLine /> Order Statistics
          </button>
          <button className="action-button" onClick={fetchPremiumCustomers}>
            <FaUsers /> Premium Customers
          </button>
          {/* <button className="action-button">
            <FaChartLine /> View Reports
          </button> */}
        </div>
      </section>

      {showOrders && (
        <section className="recent-orders">
          <h2>Recent Orders</h2>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.OrderID}>
                    <td>#{order.OrderID}</td>
                    <td>{order.CustomerName}</td>
                    <td>{order.ItemCount}</td>
                    <td>{formatCurrency(order.TotalAmount)}</td>
                    <td>
                      <span className={`status-${order.Status.toLowerCase()}`}>
                        {order.Status}
                      </span>
                    </td>
                    <td>{formatDate(order.OrderDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

{showPremiumCustomers && (
        <section className="premium-customers">
          <h2>Premium Customers</h2>
          <div className="customers-table">
            <table>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Total Spending</th>
                  <th>Order Count</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {premiumCustomers.map((customer) => (
                  <tr key={customer.CustomerID}>
                    <td>#{customer.CustomerID}</td>
                    <td>{customer.Name}</td>
                    <td>{formatCurrency(customer.TotalSpending)}</td>
                    <td>{customer.OrderCount}</td>
                    <td>
                      <span className="status-premium">
                        Premium
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

{showOrderStats && orderStats && (
        <section className="order-statistics">
          <h2>Order Statistics</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <h3>Total Orders</h3>
              <p>{orderStats.TotalOrders}</p>
              <span className="stat-label">Completed Orders</span>
            </div>

            <div className="stat-box">
              <h3>Average Order Value</h3>
              <p>{formatCurrency(orderStats.AverageOrderValue)}</p>
              <span className="stat-label">Per Order</span>
            </div>

            <div className="stat-box">
              <h3>Highest Order</h3>
              <p>{formatCurrency(orderStats.HighestOrder)}</p>
              <span className="stat-label">Maximum Value</span>
            </div>

            <div className="stat-box">
              <h3>Lowest Order</h3>
              <p>{formatCurrency(orderStats.LowestOrder)}</p>
              <span className="stat-label">Minimum Value</span>
            </div>

            <div className="stat-box">
              <h3>Total Revenue</h3>
              <p>{formatCurrency(orderStats.TotalRevenue)}</p>
              <span className="stat-label">From Completed Orders</span>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default AdminPortal;