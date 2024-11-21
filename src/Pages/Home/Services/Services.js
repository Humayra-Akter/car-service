import React, { useEffect, useState } from "react";
import Service from "../Service/Service";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/service")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const displayedServices = showAll ? services : services.slice(0, 4);

  return (
    <div id="services" className="services-section py-5">
      <h1 className="text-center services-title mb-4">Our Services</h1>
      <div className="services-container">
        {displayedServices.map((service) => (
          <Service key={service._id} service={service} />
        ))}
      </div>
      {!showAll && (
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={() => setShowAll(true)}>
            Show All
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
