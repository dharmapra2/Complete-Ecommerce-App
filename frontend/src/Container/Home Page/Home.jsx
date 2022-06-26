import React from "react";
import Products from "../ProductsPage/Products";
import Navbar from "../Header/Navbar";
function Home() {
  return (
    <div className="container-fluid m-0 p-0">
      <Navbar />
      <Products />
    </div>
  );
}

export default Home;
