import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from backend
  const fetchOrders = async () => {
    if (!token) return;

    try {
      setLoading(true);

      // Send userId if your backend requires it
      const userId = localStorage.getItem('userId'); 
      const response = await axios.post(
        url + '/api/order/userorders',
        { userId },
        { headers: { token } }
      );

      setOrders(response.data.data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token, url]);

  if (loading) {
    return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="spinner">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p>
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span
                  style={{
                    color:
                      order.status === 'Delivered'
                        ? '#16a34a'
                        : order.status === 'Out for Delivery'
                        ? '#f59e0b'
                        : '#3b82f6',
                  }}
                >
                  ●
                </span>
                <b style={{ marginLeft: 8 }}>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Refresh</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;






