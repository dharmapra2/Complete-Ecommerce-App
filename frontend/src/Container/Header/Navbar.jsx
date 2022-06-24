import React from "react";
import './Navbar.css'
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg d-flex flex-column m-0 p-0">
      <div className="container-md">
        <NavLink className="navbar-brand" to="/home">
          Ecommerce App
        </NavLink>
        <div className="navbar bd-highlight">
          <ul className="d-flex flex-row m-0">
            <div className="nav-item nav-link ">
              <NavLink className="btn btn-sm" to="/home">
                Home
              </NavLink>
            </div>
            <div className="nav-item nav-link ">
              <NavLink className="btn btn-sm" to="/addProduct">
                Add Products
              </NavLink>
            </div>
            <div className="nav-item nav-link ">
              <NavLink className="btn btn-sm btn-success" to="/cart">
                Cart
                <span role='img' aria-labelledby='none'>&#x1F6D2;</span>
              </NavLink>
            </div>
          </ul>
          <div className="d-flex m-1">
            <NavLink className="btn btn-sm btn-warning" to="/">
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
