import React, { useEffect, useState } from "react";
import "./Products.css";
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
  return (
    <div className="container">
      {prodList.map((item, index) => {
        console.log(item.filePath);
        return (
          <div className="card" key={index}>
            <img
              src={`${url}` + item.filePath}
              className="card-img-top img-fluid"
              alt={item.pname}
            />
            <div className="card-body">
              <h5 className="card-title">{item.pname}</h5>
              <p className="card-text">
                <i className="fa-solid fa-indian-rupee-sign">&#8377; </i>
                {item.price}
              </p>
              <button className="btn btn-primary m-0">Add to cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
