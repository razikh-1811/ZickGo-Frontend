import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [Menu, setMenu] = useState("home");

  // ✅ moved inside component
  const navigate = useNavigate();

  const { getTotalCartAmount, token, settoken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
    navigate("/"); // ✅ works now
  };

  return (
    <div className="navbar">
      <img src={assets.logo} alt=" " className="logo" />
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={Menu === "home" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={Menu === "menu" ? "active" : ""}
          >
            menu
          </a>
        </li>
        <li>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={Menu === "mobile-app" ? "active" : ""}
          >
            mobile-app
          </a>
        </li>
        <li>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={Menu === "contact-us" ? "active" : ""}
          >
            contact-us
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt=" " />
        <div className="navbar-searchicon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="navbar-button"
          >
            Sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate("/myOrders")}>
                <img src={assets.profile_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

