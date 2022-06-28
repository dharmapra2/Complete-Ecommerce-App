import React from "react";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Container/Sign/Login";
import Signup from "./Container/Registration/Signup";
import Home from "./Container/Home Page/Home";
import AddProduct from "./Container/ProductsPage/AddProduct";
import ProdDetails from "./Container/ProductsPage/ProdDetails";
import Cart from "./Container/Cart/Cart";
import Checkout from "./Container/Checkout/Checkout";
import ErrorPage from "./Container/MessagePage/ErrorPage";
function App() {
  return (
    <>
     
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/ProdDetails/:id" element={<ProdDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
