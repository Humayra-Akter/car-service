import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../../api/axiosPrivate";
import auth from "../../firebase.init";
import "./Order.css";

const Order = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      const url = `http://localhost:5000/order?email=${user?.email}`;
      try {
        const { data } = await axiosPrivate.get(url);
        setOrders(data);
      } catch (err) {
        console.error(err.message);
        setError("Failed to fetch orders. Please try again later.");
        if (err.response?.status === 401 || err.response?.status === 403) {
          signOut(auth);
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) getOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="order-container w-75 mx-auto">
      <h2 className="order-title text-center my-4">
        Your Orders ({orders.length})
      </h2>
      {orders.length === 0 ? (
        <p className="text-center no-orders">You have no orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <p>
                <strong>Service:</strong> {order.service}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
