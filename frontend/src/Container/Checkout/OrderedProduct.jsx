import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import { cart } from "../../APi/commonApi";
function OrderedProduct() {
  const [cartList, SetCartList] = useState([]);
  const localData = JSON.parse(localStorage.getItem("Data"));
  useEffect(() => {
    const test = {
      uid: localData.uid,
    };
    const data = async () => {
      await cart.post("/cartDetails", test).then((res) => {
        SetCartList(res.data);
      });
    };
    data();
  }, [localData]);
  let html = "";
  if (cartList.length > 0) {
    html = (
      <>
        <table className="table table-striped table-inverse table-responsive">
          <thead className="thead-inverse">
            <tr>
              <th>
                <small>No.</small>
              </th>
              <th>
                <small>Product Name</small>
              </th>
              <th>
                <small>Quantity</small>
              </th>
              <th>
                <small>Price</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartList.map((item, i) => {
              return (
                <tr key={i} className="text-center">
                  <td>
                    <div className="p-2 bd-highlight">{++i}</div>
                  </td>
                  <td>
                    <div className="p-2 bd-highlight">{item.pname}</div>
                  </td>
                  <td>
                    <div className="p-2 bd-highlight">{item.qty}</div>
                  </td>
                  <td>
                    <div className="p-2 bd-highlight">{item.price}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } else {
    html = (
      <div className="mt-2 p-2 bd-highlight text-center">
        <p>Your Cart is empty...</p>
      </div>
    );
  }
  return (
    <div className="container-fluid m-0 p-0">
      <Navbar />
      <div className="container-md">
        <div className="d-flex flex-column bd-highlight mb-3">{html}</div>
      </div>
    </div>
  );
}

export default OrderedProduct;
