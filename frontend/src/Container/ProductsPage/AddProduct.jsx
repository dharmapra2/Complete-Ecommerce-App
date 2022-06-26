import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../Header/Navbar";
import { auth } from "../../APi/commonApi";
function AddProduct() {
  const [msg, SetMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function FormData(e) {
    // console.log(e);
    const data = {
      pname: e.pname,
      img: e.img[0],
      desc: e.desc,
      price: e.price,
      category: e.category,
    };
    // console.log(data);
    // const token = JSON.parse(localStorage.getItem("Token"));
    console.log(errors);
    auth
      .post("/storeProduct", data)
      .then((res) => {
        if (res.status === 200) {
          SetMsg(res.data);
          document.getElementById("form").reset();
        }
      })
      .catch((err) => {
        console.log(err);
        SetMsg("something went wrong...");
        // localStorage.setItem("Token", null);
      });
    setTimeout(() => {
      SetMsg("");
    }, 2000);
    return true;
  }
  return (
    <div className="container-fluid m-0 p-0">
      <Navbar />
      <div className="container-sm">
        <input
          type={msg ? "text" : "hidden"}
          className={
            msg.startsWith("Product")
              ? "alert alert-primary m-1 p-1"
              : "alert alert-danger m-1 p-1"
          }
          role="alert"
          value={msg}
          readOnly
        />
        <form
          name="form"
          id="form"
          encType="multipart/form-data"
          onSubmit={handleSubmit(FormData)}
        >
          <div className="mb-2 row">
            <label className="col-xs-4 col-form-label">Name</label>
            <div className="col-xs-8">
              <input
                type="text"
                className="form-control form-control-sm"
                name="pname"
                placeholder="Name"
                {...register("pname", { required: true })}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <label className="col-xs-4 col-form-label">Price</label>
            <div className="col-xs-8">
              <input
                type="number"
                className="form-control form-control-sm"
                name="price"
                placeholder="Enter Price"
                {...register("price", { required: true })}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <label className="col-xs-4 col-form-label">Category</label>
            <div className="col-xs-8">
              <input
                type="text"
                className="form-control form-control-sm"
                name="category"
                placeholder="Category name"
                {...register("category", { required: true })}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <label className="col-xs-4 col-form-label">Description</label>
            <div className="col-xs-8">
              <input
                type="text"
                className="form-control form-control-sm"
                name="desc"
                placeholder="Description"
                {...register("desc", { required: true })}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Upload Product Image</label>
            <input
              type="file"
              className="form-control form-control-sm"
              name="img"
              {...register("img", { required: true })}
            />
          </div>
          <div className="mb-3 row">
            <div className="offset-sm-4 col-sm-8">
              <button type="submit" className="btn btn-primary">
                Upload Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
