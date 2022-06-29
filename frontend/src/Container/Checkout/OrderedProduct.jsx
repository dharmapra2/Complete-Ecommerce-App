import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import { cart } from "../../APi/commonApi";
function OrderedProduct() {
  const [orderList, SetOrderList] = useState([]);
  const localData = JSON.parse(localStorage.getItem("Data"));
  useEffect(() => {
    const test = {
      uid: localData.uid,
    };
    const data = async () => {
      await cart
        .post("/getOrderedDetails", JSON.stringify(test))
        .then((res) => {
          SetOrderList(res.data);
          // console.log(res);
        });
    };
    data();
  }, []);
  let html = "";
  if (orderList.length > 0) {
    html = (
      <div className="table-responsive-md">
        <table className="table table-md table-striped table-inverse">
          <thead className="text-center">
            <tr>
              <th>
                <small>No. of Order</small>
              </th>
              <th>
                <small>Order ID</small>
              </th>
              <th>
                <small>Ordered Items</small>
              </th>
              {/* <th>
                <small>Payees Name</small>
              </th>
              <th>
                <small>Email</small>
              </th> */}
              <th>
                <small>Price</small>
              </th>
              <th>
                <small>Ordered Date</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((item, i) => {
              return (
                <tr key={i} className="text-center">
                  <td>
                    <small>{++i}</small>
                  </td>
                  <td>
                    <small>{item.orderId}</small>
                  </td>
                  <td>
                    <small>{item.orderedItems}</small>
                  </td>
                  {/* <td>
                    <small>{item.full_name}</small>
                  </td>
                  <td>
                    <small>{item.email}</small>
                  </td> */}
                  <td>
                    <small>{item.price}</small>
                  </td>
                  <td>
                    <small>{item.created_at.split("T")[0]}</small>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    html = (
      <div className="mt-2  text-center">
        <p>You did not ordered anything..</p>
      </div>
    );
  }
  return (
    <div className="container-fluid m-0 p-0">
      <Navbar />
      <div className="m-2">{html}</div>
    </div>
  );
}

export default OrderedProduct;
