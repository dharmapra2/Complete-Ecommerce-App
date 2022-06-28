import React, { useEffect } from "react";
import "./Login.css";
import { http } from "../../APi/commonApi";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("Data"));
    // console.log(token);
    // console.log(token);
    if (token !== null) {
      navigate("/home");
    }
  }, [navigate]);
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
    // let token = "";
    http
      .post("/login", data)
      .then((res) => {
        if (res.status === 200) {
          swal("", "Login Sucessfully...", "success");
          // swal('Sucess',"Login Sucessfully...");
          localStorage.setItem("Data", JSON.stringify(res.data));
          setTimeout(() => {
            window.location.replace("/home");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        swal("Unauhorized", "Invalid username & password...", "error");
        localStorage.removeItem("Data");
      });
    setTimeout(() => {
      document.getElementById("form").reset();
    }, 2000);
  }
  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-center">LogIn</h5>
        </div>
        <div className="modal-body">
          <form name="form" id="form" onSubmit={(event) => FormData(event)}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control form-control-sm"
                placeholder="Username"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control form-control-sm"
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="submit"
                className="btn btn-block btn-sm btn-success"
                value="Sign in"
              />
            </div>
          </form>
          <div className="justify-content-center">
            <p className="card-text align-center small">
              Don't Have Any Account
            </p>

            <div className="mb-3">
              <NavLink
                className="btn btn-block btn-sm btn-success m-1"
                to="/Signup"
              >
                Creat New Account
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
