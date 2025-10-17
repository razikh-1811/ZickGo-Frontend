import React, { useContext, useEffect, useState } from 'react'
import "./verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const { url, token } = useContext(StoreContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const verifyPayment = async () => {
    try {
      if (!token) throw new Error("User not logged in")

      const response = await axios.post(
        `${url}/api/order/verify`,
        { success, orderId },
        { headers: { token } }
      )

      if (response.data.success) {
        navigate("/myorders")
      } else {
        navigate("/")
      }
    } catch (err) {
      console.error("Payment verification error:", err)
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [success, orderId, token])

  return (
    <div className='verify'>
      {loading && <div className='spinner'>Processing Payment...</div>}
    </div>
  )
}

export default Verify

