import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./MyOrders.css";
import { assets } from "../../assets/assets.js";   
import { StoreContext } from "../../context/StoreContext.jsx";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "api/order/userOrders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt=" " />
            <p>
              {order.items.map((item, i) =>
                i === order.items.length - 1
                  ? `${item.name} X ${item.quantity}`
                  : `${item.name} X ${item.quantity}, `
              )}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span
                style={{
                  color:
                    order.status === "Delivered"
                      ? "#16a34a"
                      : order.status === "Out for Delivery"
                      ? "#f59e0b"
                      : "#3b82f6",
                }}
              >
                ●
              </span>
              <b style={{ marginLeft: 8 }}>{order.status}</b>
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;

