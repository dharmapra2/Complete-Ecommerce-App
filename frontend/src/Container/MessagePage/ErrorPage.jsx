import React from "react";
import Navbar from "../Header/Navbar";
function ErrorPage() {
  return (
    <div className="container-fluid m-0 p-0">
      <Navbar />
      <div className="container">
        <div className="card text-center">
          <div className="card-body">
            <h4 className="card-title">404</h4>
            <p className="card-text">Page Not Found..</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
