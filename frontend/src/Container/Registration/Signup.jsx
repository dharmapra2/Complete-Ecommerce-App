import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { http } from "../../APi/commonApi";
import swal from "sweetalert";
function Signup() {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("Token");
    // console.log(token);
    if (token !== null) {
      console.log("kdfgje")
      navigate("/home");
    }
  }, [navigate]);
  const [errorMsg, SetErrorMsg] = useState([]);
  function FormData(e) {
    e.preventDefault();
    let data = Array.from(e.target)
      .slice(0, -1)
      .reduce(
        (acc, val) => ({
          ...acc,
          [val.name]: val.value.trim(),
        }),
        {}
      );
    http
      .post("/register", data)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          swal("Sucess", res.data.sucess, "success");
          errorMsg([]);
        } else if (res.status === 201) {
          swal("Warning", res.data.warning, "warning");
        }
      })
      .catch((error) => {
        SetErrorMsg(error.response.data.errors);
        // console.log(error.response);
        swal("Errors", error.response.data.message, "error");
      });
    setTimeout(() => {
      document.getElementById("form").reset();
    }, 1000);
  }
  // setTimeout(() => {
  //   msgRef.current.type='text';
  // }, 200);
  // console.log(msgRef.current);
  return (
    <div className="modal-dialog mt-4">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-center" id="exampleModalLabel">
            Create An Account
          </h5>
        </div>
        <div className="modal-body">
          <form name="form" id="form" onSubmit={(event) => FormData(event)}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control form-control-sm"
                placeholder="username"
                // pattern="[A-Za-z0-9]{2,}\s*"
              />
              <span className="text-danger small">{errorMsg.name}</span>
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control form-control-sm"
                placeholder="enter password"
                // pattern="[A-Za-z0-9]{2,}\s*"
              />
              <span className="text-danger small">{errorMsg.password}</span>
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-sm btn-success btn-block"
              >
                Create Account
              </button>
            </div>
          </form>
          <div className="justify-content-center">
            <p className="card-text align-center small">
              Already Have An Account
              <NavLink className="btn btn-block btn-sm btn-success m-1" to="/">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
