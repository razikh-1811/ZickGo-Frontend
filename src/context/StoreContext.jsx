import { createContext,useEffect,useState } from "react";
import axios from "axios"

export const StoreContext= createContext(null);
const StoreContextProvider=(props)=>
{
    const [cartItems,setCartItems]=useState({})
    const url="https://zick-go-back-end.vercel.app/";
    const [token,settoken]=useState("");
    const [food_list,setfood_list]=useState([]);
    const addToCart= async (ItemId)=>
    {
        if(!cartItems[ItemId])
        {
            setCartItems((prev)=>({...prev,[ItemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]+1}))
        }
        if (token)
        {
            await axios.post(url+"/api/cart/add",{ItemId},{headers:{token}})
        }
    }
    const removeFromCart=async (ItemId)=>
    {
        setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]-1}))
        if(token)
        {
            await axios.post(url+"/api/cart/remove",{ItemId},{headers:{token}})
        }
    }
  


    const getTotalCartAmount=()=>
    {
        let totalAmount=0;
        for (const item in cartItems)
        {
            if(cartItems[item]>0)
            {
            let ItemInfo=food_list.find((product)=>product._id===item)
            totalAmount+=ItemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }
    const fetchFoodList= async ()=>
    {
        const response= await axios.get(url+"/api/food/list");
        setfood_list(response.data.data);
    }
    const loadCartData = async (token)=>
    {
           const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
           setCartItems(response.data.cartData);
    }
    useEffect(()=>
    {
        async function loadData()
        {
            await fetchFoodList();
        if(localStorage.getItem("token"))
        {
            settoken(localStorage.getItem("token"))
            await loadCartData(localStorage.getItem("token"));
        }
        }
        loadData();
    },[])
      const contextValue ={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        settoken,
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
