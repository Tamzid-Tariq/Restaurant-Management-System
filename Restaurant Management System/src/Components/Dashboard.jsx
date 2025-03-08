// // import React from "react";
// // import "bootstrap-icons/font/bootstrap-icons.css";
// // import "bootstrap/dist/js/bootstrap.bundle.min.js";
// // import { Link, Outlet, useNavigate } from "react-router-dom";
// // import { FaUtensils, FaUsers, FaClipboardList, FaChartLine } from 'react-icons/fa';
// // import "./Dashboard.css";
// // import axios from 'axios';
// // import { useState, useEffect } from "react";

// // const Dashboard = () => {
// //   const [statistics, setStatistics] = useState({
// //     totalOrders: 0,
// //     totalCustomers: 0,
// //     totalReservations: 0,
// //     totalRevenue: 0
// //   });
// //   useEffect(() => {
// //     fetchStatistics();
// //   }, []);

// //   const fetchStatistics = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:3000/api/statistics');
// //       if (response.data.Status === "Success") {
// //         // Convert TotalRevenue to number and handle null/undefined cases
// //         const stats = response.data.Statistics;
// //         setStatistics({
// //           ...stats,
// //           TotalRevenue: Number(stats.TotalRevenue) || 0
// //         });
// //       }
// //     } catch (error) {
// //       console.error('Error fetching statistics:', error);
// //     }
// //   };
  
// //   const formatCurrency = (amount) => {
// //     return new Intl.NumberFormat('en-US', {
// //       style: 'currency',
// //       currency: 'USD',
// //       minimumFractionDigits: 2
// //     }).format(amount);
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       {/* Sidebar */}
// //       <div className="sidebar">
// //         <div className="sidebar-header">
// //           <Link to="/dashboard" className="brand-link">
// //             <i className="bi bi-grid-fill"></i>
// //             <span>Admin Dashboard</span>
// //           </Link>
// //         </div>

// //         <nav className="sidebar-nav">
// //           {/* Manage Customers */}
// //           <div className="nav-section">
// //             <div className="dropdown">
// //               <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
// //                 <i className="bi bi-people-fill"></i>
// //                 <span>Manage Customers</span>
// //               </button>
// //               <ul className="dropdown-menu">
// //                 <li>
// //                   <Link to="/dashboard/ManageCustomers" className="dropdown-item">
// //                     <i className="bi bi-person-plus"></i> Add Customer
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/dashboard/CustomerDetail" className="dropdown-item">
// //                     <i className="bi bi-person-lines-fill"></i> Customer Directory
// //                   </Link>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>

// //           {/* Manage Staff */}
// //           <div className="nav-section">
// //             <div className="dropdown">
// //               <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
// //                 <i className="bi bi-people-fill"></i>
// //                 <span>Manage Staff</span>
// //               </button>
// //               <ul className="dropdown-menu">
// //                 <li>
// //                   <Link to="/dashboard/ManageStaff" className="dropdown-item">
// //                     <i className="bi bi-person-plus-fill"></i> Add Staff
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/dashboard/StaffDetail" className="dropdown-item">
// //                     <i className="bi bi-person-badge"></i> Staff Directory
// //                   </Link>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>

// //           {/* Manage Menu */}
// //           <div className="nav-section">
// //             <div className="dropdown">
// //               <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
// //                 <i className="bi bi-menu-button-wide"></i>
// //                 <span>Manage Menu</span>
// //               </button>
// //               <ul className="dropdown-menu">
// //                 <li>
// //                   <Link to="/dashboard/ManageMenu" className="dropdown-item">
// //                     <i className="bi bi-plus-square"></i> Add Menu
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/dashboard/MenuDetail" className="dropdown-item">
// //                     <i className="bi bi-card-list"></i> Menu Directory
// //                   </Link>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>

// //           {/* Manage Orders */}
// //           <div className="nav-section">
// //             <div className="dropdown">
// //               <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
// //                 <i className="bi bi-cart-fill"></i>
// //                 <span>Manage Orders</span>
// //               </button>
// //               <ul className="dropdown-menu">
// //                 <li>
// //                   <Link to="/dashboard/ManageOrder" className="dropdown-item">
// //                     <i className="bi bi-plus-circle"></i> Add New Order
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/dashboard/OrderDetail" className="dropdown-item">
// //                     <i className="bi bi-list-ul"></i> Orders Directory
// //                   </Link>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>

// //           {/* Manage Bookings */}
// //           <div className="nav-section">
// //             <Link to="/dashboard/ManageBookings" className="nav-link">
// //               <i className="bi bi-calendar-check"></i>
// //               <span>Manage Bookings</span>
// //             </Link>
// //           </div>
// //         </nav>
// //       </div>

// //       {/* Main Content */}
// //       {/* <div className="main-content">
        
// //         <header className="main-header">
// //           <h2>Restaurant Management System</h2>
// //         </header>
        
// //         <div className="content-wrapper">
// //           <Outlet />
// //         </div>
// //       </div> */}

// //     <div className="home-container">
// //       <header className="header">
// //         <h1>Restaurant Dashboard</h1>
// //         <p>Welcome back, Admin</p>
// //       </header>

// //       <div className="stats-container">
// //         <div className="stat-card">
// //           <div className="stat-icon-wrapper">
// //             <FaUtensils className="stat-icon" />
// //           </div>
// //           <div className="stat-info">
// //             <h3>Total Orders</h3>
// //             <p>{statistics.TotalOrders || 0}</p>
// //           </div>
// //         </div>

// //         <div className="stat-card">
// //           <div className="stat-icon-wrapper">
// //             <FaUsers className="stat-icon" />
// //           </div>
// //           <div className="stat-info">
// //             <h3>Total Customers</h3>
// //             <p>{statistics.TotalCustomers || 0}</p>
// //           </div>
// //         </div>

// //         <div className="stat-card">
// //           <div className="stat-icon-wrapper">
// //             <FaClipboardList className="stat-icon" />
// //           </div>
// //           <div className="stat-info">
// //             <h3>Total Reservations</h3>
// //             <p>{statistics.TotalReservations || 0}</p>
// //           </div>
// //         </div>

// //         <div className="stat-card">
// //           <div className="stat-icon-wrapper">
// //             <FaChartLine className="stat-icon" />
// //           </div>
// //           <div className="stat-info">
// //             <h3>Total Revenue</h3>
// //             <p>{formatCurrency(statistics.TotalRevenue)}</p>
// //           </div>
// //         </div>
// //       </div>

// //       <section className="quick-actions">
// //         <h2>Quick Actions</h2>
// //         <div className="actions-grid">
// //           <button className="action-button">
// //             <FaUtensils /> New Order
// //           </button>
// //           <button className="action-button">
// //             <FaClipboardList /> Add Reservation
// //           </button>
// //           <button className="action-button">
// //             <FaUsers /> Manage Customers
// //           </button>
// //           <button className="action-button">
// //             <FaChartLine /> View Reports
// //           </button>
// //         </div>
// //       </section>
// //     </div>


// //     </div>
    
// //   );
// // };

// // export default Dashboard;


// import React, { useEffect } from "react";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import axios from "axios";

// // function Dashboard() {
// // 	const navigate = useNavigate()
// // 	axios.defaults.withCredentials = true;
// // 	useEffect(()=>{
// // 		axios.get('http://localhost:3000/dashboard')
// // 		.then(res => {
// // 			if(res.data.Status === "Success") {
// // 				if(res.data.role === "admin") {
// // 					navigate('/');
// // 				} else {
// // 					const id = res.data.id;
// // 					navigate('/employeedetail/'+id)
// // 				}
// // 			} else {
// // 				navigate('/start')
// // 			}
// // 		})
// // 	}, [])

// // 	const handleLogout = () => {
// // 		axios.get('http://localhost:3000/logout')
// // 		.then(res => {
// // 			navigate('/start')
// // 		}).catch(err => console.log(err));
// // 	}
// const Dashboard = () => {
//   return (
//     <div className="container-fluid">
//       <div className="row flex-nowrap">
//         <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
//           <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
//             <a
//               href="/dashboard"
//               className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
//             >
//               <span className="fs-5 fw-bolder d-none d-sm-inline">
//                 Admin Dashboard
//               </span>
//             </a>
//             <ul
//               className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
//               id="menu"
//             >
//               {/* <li>
//                 <Link
//                   to="/"
//                   data-bs-toggle="collapse"
//                   className="nav-link text-white px-0 align-middle"
//                 >
//                   <i className="fs-4 bi-speedometer2"></i>{" "}
//                   <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
//                 </Link>
//               </li> */}
//               <li>
//                 <Link
//                   to="/dashboard/AdminPortal"
//                   className="nav-link px-0 align-middle text-white"
//                 >
//                   <i className="fs-4 bi-people"></i>{" "}
//                   <span className="ms-1 d-none d-sm-inline">Admin Portal</span>{" "}
//                 </Link>
//               </li>
//               {/* <li>
// 								<Link to="/dashboard/ManageCustomers" className="nav-link px-0 align-middle text-white">
// 									<i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Customers</span> </Link>
// 							</li> */}

//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle text-white px-0 align-middle"
//                   href="#"
//                   id="manageCustomersDropdown"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   <i className="fs-4 bi-people"></i>{" "}
//                   <span className="ms-1 d-none d-sm-inline">
//                     Manage Customers
//                   </span>
//                 </a>
//                 <ul
//                   className="dropdown-menu dropdown-menu-dark"
//                   aria-labelledby="manageCustomersDropdown"
//                 >
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/dashboard/ManageCustomers"
//                     >
//                       Add Customer
//                     </Link>
//                   </li>
//                   {/* <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/dashboard/RemoveCustomer"
//                     >
//                       Remove a Customer
//                     </Link>
//                   </li> */}
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/dashboard/CustomerDetail"
//                     >
//                       Customer Directory
//                     </Link>
//                   </li>
//                   {/* <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/dashboard/MostSpendedCustomer"
//                     >
//                       Most Spended Customer
//                     </Link>
//                   </li> */}
//                 </ul>
//               </li>

//               {/* <li>
// 								<Link to="/dashboard/ManageStaff" className="nav-link px-0 align-middle text-white">
// 									<i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Staff</span> </Link>
// 							</li> */}
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle text-white px-0 align-middle"
//                   href="#"
//                   id="manageCustomersDropdown"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   <i className="fs-4 bi-people"></i>{" "}
//                   <span className="ms-1 d-none d-sm-inline">
//                     Manage Staff
//                   </span>
//                 </a>
//                 <ul
//                   className="dropdown-menu dropdown-menu-dark"
//                   aria-labelledby="manageCustomersDropdown"
//                 >
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/dashboard/ManageStaff"
//                     >
//                       Add Staff
//                     </Link>
//                   </li>
//                   {/* <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/dashboard/RemoveStaff"
//                     >
//                       Remove a Staff
//                     </Link>
//                   </li> */}
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/dashboard/StaffDetail"
//                     >
//                       Staff Directory
//                     </Link>
//                   </li>
//                   {/* <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/dashboard/MostSpendedCustomer"
//                     >
//                       Most Spended Customer
//                     </Link>
//                   </li> */}
//                 </ul>
//               </li>

//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle text-white px-0 align-middle"
//                   href="#"
//                   id="manageCustomersDropdown"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   <i className="fs-4 bi-people"></i>{" "}
//                   <span className="ms-1 d-none d-sm-inline">
//                     Manage Menu
//                   </span>
//                 </a>
//                 <ul
//                   className="dropdown-menu dropdown-menu-dark"
//                   aria-labelledby="manageCustomersDropdown"
//                 >
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/dashboard/ManageMenu"
//                     >
//                       Add Menu
//                     </Link>
//                   </li>
                  
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/dashboard/MenuDetail"
//                     >
//                       Menu Directory
//                     </Link>
//                   </li>
//                   {/* <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/dashboard/MostSpendedCustomer"
//                     >
//                       Most Spended Customer
//                     </Link>
//                   </li> */}
//                 </ul>
//               </li>
              
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle text-white px-0 align-middle"
//                   href="#"
//                   id="manageCustomersDropdown"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   <i className="fs-4 bi-people"></i>{" "}
//                   <span className="ms-1 d-none d-sm-inline">
//                     Manage Orders
//                   </span>
//                 </a>
//                 <ul
//                   className="dropdown-menu dropdown-menu-dark"
//                   aria-labelledby="manageCustomersDropdown"
//                 >
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/dashboard/ManageOrder"
//                     >
//                       Add a New Order
//                     </Link>
//                   </li>
                  
//                   <li>
//                     <Link
//                       className="dropdown-item"
//                       to="/dashboard/OrderDetail"
//                     >
//                       Orders Directory
//                     </Link>
//                   </li>
//                 </ul>
//               </li>

//               <li>
//                 <Link
//                   to="/dashboard/ManageBookings"
//                   className="nav-link px-0 align-middle text-white"
//                 >
//                   <i className="fs-4 bi-person"></i>{" "}
//                   <span className="ms-1 d-none d-sm-inline">
//                     Manage Bookings
//                   </span>
//                 </Link>
//               </li>

//               {/* <li onClick={handleLogout}>
// 								<a href="#" className="nav-link px-0 align-middle text-white">
// 									<i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
// 							</li> */}
//             </ul>
//           </div>
//         </div>
//         <div class="col p-0 m-0">
//           {/* <div className="p-2 d-flex justify-content-center shadow">
//             <h4>Restaurant Management System</h4>
//           </div> */}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <Link to="/dashboard/adminportal" className="brand-link">
            <i className="bi bi-grid-fill"></i>
            <span>Admin Dashboard</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {/* Manage Customers */}
          <div className="nav-section">
            <div className="dropdown">
              <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <i className="bi bi-people-fill"></i>
                <span>Manage Customers</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/dashboard/ManageCustomers" className="dropdown-item">
                    <i className="bi bi-person-plus"></i> Add Customer
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/CustomerDetail" className="dropdown-item">
                    <i className="bi bi-person-lines-fill"></i> Customer Directory
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Manage Staff */}
          <div className="nav-section">
            <div className="dropdown">
              <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <i className="bi bi-people-fill"></i>
                <span>Manage Staff</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/dashboard/ManageStaff" className="dropdown-item">
                    <i className="bi bi-person-plus-fill"></i> Add Staff
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/StaffDetail" className="dropdown-item">
                    <i className="bi bi-person-badge"></i> Staff Directory
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Manage Menu */}
          <div className="nav-section">
            <div className="dropdown">
              <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <i className="bi bi-menu-button-wide"></i>
                <span>Manage Menu</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/dashboard/ManageMenu" className="dropdown-item">
                    <i className="bi bi-plus-square"></i> Add Menu
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/MenuDetail" className="dropdown-item">
                    <i className="bi bi-card-list"></i> Menu Directory
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Manage Orders */}
          <div className="nav-section">
            <div className="dropdown">
              <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <i className="bi bi-cart-fill"></i>
                <span>Manage Orders</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/dashboard/ManageOrder" className="dropdown-item">
                    <i className="bi bi-plus-circle"></i> Add New Order
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/OrderDetail" className="dropdown-item">
                    <i className="bi bi-list-ul"></i> Orders Directory
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Manage Bookings */}
          <div className="nav-section">
            <Link to="/dashboard/ManageBookings" className="nav-link">
              <i className="bi bi-calendar-check"></i>
              <span>Manage Bookings</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="main-header">
          <h2>Restaurant Management System</h2>
        </header>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;