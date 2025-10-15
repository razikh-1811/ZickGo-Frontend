import React, { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const LoginPage = ({ setShowLogin }) => {
  const { url, settoken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("signup"); // ✅ always lowercase
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newurl = url;
    if (currState === "login") {
      newurl += "/api/user/login";
    } else {
      newurl += "/api/user/register";
    }

    const response = await axios.post(newurl, data);
    if (response.data.success) {
      settoken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState === "login" ? "Login" : "Sign Up"}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "login" ? null : (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="Your Name"
              required
            />
          )}

          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button className="button" type="submit">
          {currState === "signup" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to terms of use & privacy policy.</p>
        </div>
        {currState === "login" ? (
          <p className="create">
            Create a New Account?
            <span onClick={() => setCurrState("signup")}> Click here</span>
          </p>
        ) : (
          <p className="create">
            Already have an account?
            <span onClick={() => setCurrState("login")}> Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;


