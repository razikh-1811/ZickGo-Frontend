import React from 'react'
import Navbar from "./components/navbar/navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/home.jsx"
import Cart from "./pages/cart/Cart.jsx"
import PlaceOrder from "./pages/placeorder/PlaceOrder.jsx"
import Footer from "./components/Footer/Footer.jsx"
import LoginPage from './LoginPage/Login.jsx'
import {useState} from "react"
import Verify from './pages/Verify/verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'


const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin?<LoginPage setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />}/>
        <Route path="/myorders" element={<MyOrders/>}/>
      
      </Routes>
      
      
    </div>
    <Footer />
    
    </>
  )
}

export default App


