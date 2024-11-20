import React, { useEffect, useState } from "react";
import banner1 from "../../images/banner/banner2.jpg";
import "./ManageServices.css";

const ManageServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/service")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (proceed) {
      const url = `http://localhost:5000/service/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          const remaining = services.filter((service) => service._id !== id);
          setServices(remaining);
        });
    }
  };

  return (
    <div
      className="manage-services-container"
      style={{ backgroundImage: `url(${banner1})` }}
    >
      <div className="overlay">
        <h1 className="title">Manage Your Services</h1>
        <div className="services-list">
          {services.map((service) => (
            <div key={service._id} className="manage-service-card">
              <h6>{service.name}</h6>
              <button
                className="delete-btn"
                onClick={() => handleDelete(service._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageServices;
