import React, { useEffect } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("Data");
    // console.log(token);
    if (token === null) {
      navigate("/");
    }
  }, [navigate]);
  const logout = () => {
    localStorage.removeItem("Data");
    localStorage.removeItem("temp");
    navigate("/");
  };
  return (
    <nav className="navbar-expand-lg">
      <ul className="nav container-fluid">
        <li className="nav-item slam-left">
          <NavLink to="/home">Ecommerce App</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/home">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/addProduct">Add Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/cart">
            Cart
            <span role="img" aria-labelledby="none">
              &#x1F6D2;
            </span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/order">Orders</NavLink>
        </li>
        <button
          className="nav-item btn btn-sm btn-warning"
          onClick={() => logout()}
        >
          Logout
        </button>
      </ul>
    </nav>
  );
}

export default Navbar;

{
  /* <nav className="navbar navbar-expand-md navbar-light bg d-flex flex-column m-0 p-0">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">
          Ecommerce App
        </NavLink>
        <div className="navbar bd-highlight">
          <ul className="d-flex flex-row m-0 justify-content-center">
            <li className="nav-item nav-link ">
              <NavLink className="btn btn-sm" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item nav-link ">
              <NavLink className="btn btn-sm" to="/addProduct">
                Add Products
              </NavLink>
            </li>
            <li className="nav-item nav-link ">
              <NavLink className="btn btn-sm" to="/cart">
                Cart
                <span role="img" aria-labelledby="none">
                  &#x1F6D2;
                </span>
              </NavLink>
            </li>
          </ul>
          <div className="d-flex m-0">
            <div className="nav-item nav-link ">
              <NavLink className="btn btn-sm" to="/order">
                Orders
              </NavLink>
            </div>
            <button className="btn btn-sm btn-warning" onClick={() => logout()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav> */
}
