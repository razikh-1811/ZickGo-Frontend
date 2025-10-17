import React, { useContext, useEffect } from 'react'
import "./verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const { url, token } = useContext(StoreContext);

const verifyPayment = async () => {
  try {
    const response = await axios.post(
      url + "/api/order/verify",
      { success, orderId },
      { headers: { token } } // send token if backend needs it
    );

    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  } catch (e) {
    console.error("Payment verify error:", e);
    navigate("/");
  }
};


     useEffect(() => {
        verifyPayment();
     }, [success, orderId])

  return (
    <div className='verify'>
        <div className='spinner'>
           
           
        </div>
            
    </div>
  )
}

export default Verify
