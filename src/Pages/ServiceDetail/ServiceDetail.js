import React from "react";
import { Link, useParams } from "react-router-dom";
import useServiceDetail from "../../hooks/useServiceDetails";
import "./ServiceDetail.css";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetail(serviceId);

  return (
    <div className="service-detail-container">
      {service ? (
        <>
          <h2 className="service-title">
            You're about to book: <span>{service.name}</span>
          </h2>
          <div className="service-info">
            <p>
              <strong>Description:</strong> {service.description}
            </p>
            <p>
              <strong>Price:</strong> ${service.price}
            </p>
          </div>
          <div className="text-center">
            <Link to={`/checkout/${serviceId}`}>
              <button className="btn btn-primary">Proceed to Checkout</button>
            </Link>
          </div>
        </>
      ) : (
        <p className="loading-text">Loading service details...</p>
      )}
    </div>
  );
};

export default ServiceDetail;
