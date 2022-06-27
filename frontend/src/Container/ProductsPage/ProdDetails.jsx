import React, { useEffect } from "react";
import Navbar from "../Header/Navbar";
import { http } from "../../APi/commonApi";
import { useParams } from "react-router-dom";
function ProdDetails() {
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const data = async () => {
      await http
        .get(`/ProdDetails/${id}`)
        .then((res) => console.log(res));
    };
    data();
  }, [id]);

  return (
    <div className="container-fluid m-0 p-0">
      <Navbar />
      <div className="container">
        <div className="card row">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <img src="" alt="..." />
            </div>
            <div className="flex-grow-1 ms-3">
              <div className="card-body">
                <h4 className="card-title">Title</h4>
                <p className="card-text">Body</p>
                <p className="card-text">Body</p>
                <p className="card-text">Body</p>
                <p className="card-text">Body</p>
                <p className="card-text">Body</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdDetails;
