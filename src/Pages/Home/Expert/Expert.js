import React from "react";
import "./Expert.css";

const Expert = ({ expert }) => {
  const { name, img } = expert;
  return (
    <div className="col">
      <div className="card shadow-lg border-0 h-100">
        <img
          src={img}
          className="card-img-top rounded-top"
          alt={name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title text-primary">{name}</h5>
          <p className="card-text text-muted">
            An expert in their field, delivering exceptional services with a
            focus on quality and professionalism.
          </p>
        </div>
        <div className="card-footer text-center bg-light border-0">
          <button className="btn btn-outline-primary">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Expert;
