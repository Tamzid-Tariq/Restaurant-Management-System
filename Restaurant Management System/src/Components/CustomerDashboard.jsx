import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("id"); // Remove the customer ID cookie
    navigate("/"); // Redirect to the homepage
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              // href="/customerdash"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Customer Dashboard
              </span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li>
                <Link
                  to="/customerdash/user-profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">User Profile</span>{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/customerdash/create-order"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-cart"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Create an order</span>{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/customerdash/book-table"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-calendar"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Book a table</span>{" "}
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="nav-link px-0 align-middle text-white btn btn-link"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fs-4 bi-box-arrow-right"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Logout</span>{" "}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Customer Dashboard</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;