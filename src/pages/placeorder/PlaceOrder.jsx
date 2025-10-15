import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "", lastName: "", email: "", street: "",
    city: "", state: "", zipcode: "", country: "", phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  const placeOrder = async (event) => {
    event.preventDefault();

    // Prepare order items (keep image intact)
    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,       // important for images to work
        quantity: cartItems[item._id]
      }));

    const orderData = {
      userId: token,             // or your user ID from context
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        window.location.href = response.data.session_url; // Stripe redirect
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>

        <div className="multi-fields">
          <input name="firstName" required value={data.firstName} onChange={onChangeHandler} placeholder='First Name' />
          <input name="lastName" required value={data.lastName} onChange={onChangeHandler} placeholder='Last Name' />
        </div>

        <input name="email" required value={data.email} onChange={onChangeHandler} placeholder='Email' />
        <input name="street" required value={data.street} onChange={onChangeHandler} placeholder='Street' />

        <div className="multi-fields">
          <input name="city" required value={data.city} onChange={onChangeHandler} placeholder='City' />
          <input name="state" required value={data.state} onChange={onChangeHandler} placeholder='State' />
        </div>

        <div className="multi-fields">
          <input name="zipcode" required value={data.zipcode} onChange={onChangeHandler} placeholder='Zip Code' />
          <input name="country" required value={data.country} onChange={onChangeHandler} placeholder='Country' />
        </div>

        <input name="phone" required value={data.phone} onChange={onChangeHandler} placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>$2</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() + 2}</b>
              </div>
              <hr />
            </div>
            <button type="submit" className='total-button'>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;



