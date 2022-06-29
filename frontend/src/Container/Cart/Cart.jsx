import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import { cart } from "../../APi/commonApi";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
function Cart() {
  const navigate = useNavigate();
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
  }, []);
  let html = "";
  let total_price = 0;
  let pname = [];
  const handleDelete = async (id) => {
    await cart
      .post("/deleteFromCart", JSON.stringify({ cartId: id }))
      .then((res) => {
        if (res.status === 200) {
          swal("Item Removed", res.data.message, "success");
          //without reload remove data and show rest data 
          SetCartList(cartList.filter((item) => item.cartId !== id));
        } else if (res.status === 401) {
          swal("Error Occoured", res.data.error, "error");
        }
        // console.log(res);
      });
  };
  const handleCheckout = () => {
    const temp = {
      price: total_price,
      pname: pname,
      uid: localData.uid,
    };
    localStorage.setItem("temp", JSON.stringify(temp));
    navigate("/checkout");
  };
  if (cartList.length > 0) {
    html = (
      <>
        <table className="table table-striped table-inverse table-responsive">
          <thead className="thead-inverse text-center">
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
              <th>
                <small>Delete from Cart</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartList.map((item, i) => {
              // console.log(item);
              pname.push(item.pname);
              total_price += item.price;
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
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.cartId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="ms-auto p-2 bd-highlight">
                Total Price = {total_price}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="ms-auto">
          <button className="btn btn-success" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
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

export default Cart;
