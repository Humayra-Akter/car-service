import React from "react";
import { useNavigate } from "react-router-dom";
import "./Service.css";

const Service = ({ service }) => {
  const { name, img, description, price, _id } = service;
  const navigate = useNavigate();

  const navigateToServiceDetail = (id) => {
    navigate(`/service/${id}`);
  };

  return (
    <div className="service-cards">
      <img src={img} alt={name} className="service-img" />
      <div className="service-content">
        <h3 className="service-name">{name}</h3>
        <p className="service-price">
          Price: <strong>${price}</strong>
        </p>
        <p className="service-description">
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </p>
        <button
          onClick={() => navigateToServiceDetail(_id)}
          className="btn btn-primary"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Service;
