import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setfood_list] = useState([]);
  const [token, settoken] = useState("");

  // Backend URL (deployed on Vercel)
  const url = "https://zick-go-back-end.vercel.app";

  // Add item to cart
  const addToCart = async (ItemId) => {
    setCartItems((prev) => ({
      ...prev,
      [ItemId]: prev[ItemId] ? prev[ItemId] + 1 : 1
    }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { ItemId },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Add to cart failed:", err.message);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (ItemId) => {
    setCartItems((prev) => ({
      ...prev,
      [ItemId]: prev[ItemId] - 1
    }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { ItemId },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Remove from cart failed:", err.message);
      }
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const ItemInfo = food_list.find((product) => product._id === item);
        if (ItemInfo) totalAmount += ItemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // Fetch food list from backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setfood_list(response.data.data);
    } catch (err) {
      console.error("Fetch food list failed:", err.message);
    }
  };

  // Load cart from backend for logged-in user
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || {});
    } catch (err) {
      console.error("Load cart failed:", err.message);
    }
  };

  // Initial load
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const localToken = localStorage.getItem("token");
      if (localToken) {
        settoken(localToken);
        await loadCartData(localToken);
      }
    }

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    settoken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

