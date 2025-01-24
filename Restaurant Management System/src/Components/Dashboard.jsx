import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

// function Dashboard() {
// 	const navigate = useNavigate()
// 	axios.defaults.withCredentials = true;
// 	useEffect(()=>{
// 		axios.get('http://localhost:3000/dashboard')
// 		.then(res => {
// 			if(res.data.Status === "Success") {
// 				if(res.data.role === "admin") {
// 					navigate('/');
// 				} else {
// 					const id = res.data.id;
// 					navigate('/employeedetail/'+id)
// 				}
// 			} else {
// 				navigate('/start')
// 			}
// 		})
// 	}, [])

// 	const handleLogout = () => {
// 		axios.get('http://localhost:3000/logout')
// 		.then(res => {
// 			navigate('/start')
// 		}).catch(err => console.log(err));
// 	}
const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Admin Dashboard
              </span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {/* <li>
                <Link
                  to="/"
                  data-bs-toggle="collapse"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
                </Link>
              </li> */}
              <li>
                <Link
                  to="/dashboard/AdminPortal"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Admin Portal</span>{" "}
                </Link>
              </li>
              {/* <li>
								<Link to="/dashboard/ManageCustomers" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Customers</span> </Link>
							</li> */}

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white px-0 align-middle"
                  href="#"
                  id="manageCustomersDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fs-4 bi-people"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">
                    Manage Customers
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="manageCustomersDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/ManageCustomers"
                    >
                      Add Customer
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/RemoveCustomer"
                    >
                      Remove a Customer
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/CustomerDetail"
                    >
                      Customer Directory
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/MostSpendedCustomer"
                    >
                      Most Spended Customer
                    </Link>
                  </li> */}
                </ul>
              </li>

              {/* <li>
								<Link to="/dashboard/ManageStaff" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Staff</span> </Link>
							</li> */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white px-0 align-middle"
                  href="#"
                  id="manageCustomersDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fs-4 bi-people"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">
                    Manage Staff
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="manageCustomersDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/ManageStaff"
                    >
                      Add Staff
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/RemoveStaff"
                    >
                      Remove a Staff
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/StaffDetail"
                    >
                      Staff Directory
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/MostSpendedCustomer"
                    >
                      Most Spended Customer
                    </Link>
                  </li> */}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white px-0 align-middle"
                  href="#"
                  id="manageCustomersDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fs-4 bi-people"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">
                    Manage Menu
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="manageCustomersDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/ManageMenu"
                    >
                      Add Menu
                    </Link>
                  </li>
                  
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/MenuDetail"
                    >
                      Menu Directory
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/MostSpendedCustomer"
                    >
                      Most Spended Customer
                    </Link>
                  </li> */}
                </ul>
              </li>
              
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white px-0 align-middle"
                  href="#"
                  id="manageCustomersDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fs-4 bi-people"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">
                    Manage Orders
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="manageCustomersDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/ManageOrder"
                    >
                      Add a New Order
                    </Link>
                  </li>
                  
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/dashboard/OrderDetail"
                    >
                      Orders Directory
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link
                  to="/dashboard/ManageBookings"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">
                    Manage Bookings
                  </span>
                </Link>
              </li>

              {/* <li onClick={handleLogout}>
								<a href="#" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
							</li> */}
            </ul>
          </div>
        </div>
        <div class="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Restaurant Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
