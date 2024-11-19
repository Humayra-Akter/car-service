import React from "react";
import { useParams } from "react-router-dom";
import useServiceDetails from "../../../hooks/useServiceDetails";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import axios from "axios";
import { toast } from "react-toastify";
import checkoutBg from "../../../images/banner/banner3.jpg";
import "./CheckOut.css";

const CheckOut = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetails(serviceId);
  const [user] = useAuthState(auth);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const order = {
      email: user.email,
      service: service.name,
      serviceId: serviceId,
      address: event.target.address.value,
      phone: event.target.phone.value,
    };
    axios.post("http://localhost:5000/order", order).then((response) => {
      const { data } = response;
      if (data.insertedId) {
        toast("Your order has been successfully booked!");
        event.target.reset();
      }
    });
  };

  return (
    <div
      className="checkout-container"
      style={{ backgroundImage: `url(${checkoutBg})` }}
    >
      <div className="overlay">
        <PageTitle title="CheckOut" />
        <h2 className="service-title">Order Service: {service.name}</h2>
        <form onSubmit={handlePlaceOrder} className="checkout-form">
          <input
            className="form-input"
            type="text"
            value={user?.displayName}
            name="name"
            placeholder="Name"
            required
            readOnly
            disabled
          />
          <input
            className="form-input"
            type="email"
            value={user?.email}
            name="email"
            placeholder="Email"
            required
            readOnly
            disabled
          />
          <input
            className="form-input"
            type="text"
            value={service.name}
            name="service"
            placeholder="Service"
            required
            readOnly
          />
          <input
            className="form-input"
            type="text"
            autoComplete="off"
            name="address"
            placeholder="Address"
            required
          />
          <input
            className="form-input"
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
          />
          <button className="btn btn-primary form-submit" type="submit">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
