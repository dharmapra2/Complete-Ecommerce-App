import React, { useEffect, useState } from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import { http, url } from "../../APi/commonApi";
function Products() {
  const [prodList, setProdList] = useState([]);
  useEffect(() => {
    const data = async () => {
      await http
        .get("/getProducts")
        .then((res) => setProdList(Object.values(res.data)));
    };
    data();
  }, []);
  let items = "";

  if (prodList.length > 0) {
    items = prodList.map((item, index) => {
      // console.log(item.pid);
      return (
        <div className="card" key={index}>
          <Link to={`/ProdDetails/${item.pid}`}>
            <img
              src={`${url}` + item.filePath}
              className="card-img-top img-fluid"
              alt={item.pname}
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">{item.pname}</h5>
            {/* <p className="card-text">
              <i className="fa-solid fa-indian-rupee-sign">&#8377; </i>
              {item.price}
            </p>
            <button className="btn btn-primary m-0">Add to cart</button> */}
          </div>
        </div>
      );
    });
  } else {
    items = (
      <div className="card">
        <div className="card-body text-white">No Product is found.</div>
      </div>
    );
  }
  return <div className="container">{items}</div>;
}

export default Products;
