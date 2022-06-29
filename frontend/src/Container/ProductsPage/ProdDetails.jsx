import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import swal from "sweetalert";
import { http, url, cart } from "../../APi/commonApi";
import { useParams } from "react-router-dom";
function ProdDetails() {
  const { id } = useParams();
  const [prod, SetProd] = useState();
  const [qty, SetQty] = useState(1);
  useEffect(() => {
    const data = async () => {
      await http.get(`/prodDetails/${id}`).then((res) => {
        if (res.status === 200) {
          SetProd(res.data);
        } else if (res.status === 404) {
          console.log(res.data);
        }
      });
    };
    data();
  }, [id]);
  const addToCart = () => {
    const localData = JSON.parse(localStorage.getItem("Data"));
    // console.log(localData);
    if (!localData) {
      swal("Warning", "Please Login to addCart...", "warning");
    }
    const data = {
      uid: localData.uid,
      pid: prod.pid,
      price: qty * prod.price,
      pname:prod.pname,
      qty: qty,
    };
    // console.log("added to cart");
    const adding = async () => {
      await cart
        .post("/addToCart", data)
        .then((response) => {
          if (response.status === 200) {
            swal("Success", response.data.sucess, "success");
          } else if (response.status === 201) {
            swal("Warning", response.data.warning, "warning");
          }
        })
        .catch((err) => {
          console.log(err);
          swal("Error", "something went wrong..", "error");
        });
    };
    adding();
  };
  const decrementQty = () => {
    if (qty > 1) {
      SetQty((prevValue) => prevValue - 1);
    }
  };
  const incrementQty = () => {
    if (qty < 10) {
      console.log("increment");
      SetQty((prevValue) => prevValue + 1);
    }
  };
  let details = "";
  if (prod) {
    // console.log(prod);
    details = (
      <div className="d-inline-flex align-items-center justify-content-around">
        <img src={url + prod.filePath} alt="..." width="35%" />

        <div className="flex-grow-1 text-white">
          <p className="text-center">Product : {prod.pname}</p>
          <p className="text-center">Rs. {prod.price}</p>
          <div className="ms-4">
            <button className="btn btn-primary" onClick={decrementQty}>
              -
            </button>
            <small className="border m-auto bg-dark p-2">{qty}</small>
            <button className="btn btn-primary" onClick={incrementQty}>
              +
            </button>
          </div>
          <div className="m-2">Total Price : {qty * prod.price}</div>
          <button className="btn btn-primary m-2" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    );
  } else {
    details = <div className="card alert">No Product Found.</div>;
  }
  return (
    <div className="container-fluid m-0 p-0">
      <Navbar />
      <div className="container-sm mt-3">{details}</div>
    </div>
  );
}

export default ProdDetails;
