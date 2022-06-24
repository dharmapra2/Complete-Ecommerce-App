import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {http} from "../../APi/commonApi";
function Signup() {
  // let temp = "";
  // const msgRef = useRef();
  // msgRef.current.type='hide';
  const [msg, SetMsg] = useState("");
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
    http.post("/register", data).then((res) => SetMsg(res.data));
    setTimeout(() => {
      document.getElementById('form').reset();
      SetMsg('');
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
        <input
            type={(msg)?'text':'hidden'}
            className="alert alert-primary m-1 p-1"
            role="alert"
            value={msg}
            readOnly
          />
        <div className="modal-body">
          <form name="form" id="form" onSubmit={(event) => FormData(event)}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control form-control-sm"
                placeholder="username"
                // pattern="[A-Za-z0-9]{2,}\s*"
                minLength={6}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control form-control-sm"
                placeholder="enter password"
                // pattern="[A-Za-z0-9]{2,}\s*"
                minLength={6}
                required
              />
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
