import React from "react";
// import Navbar from "./Container/Header/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Container/Sign/Login";
import Signup from "./Container/Registration/Signup";
import Home from "./Container/Home Page/Home";
import AddProduct from "./Container/ProductsPage/AddProduct";
function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addProduct" element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
