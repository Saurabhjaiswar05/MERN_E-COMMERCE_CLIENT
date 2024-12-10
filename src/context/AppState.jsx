import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AppState = (props) => {
  // const url = "http://localhost:1000/api";
  const url = "https://mern-e-api.onrender.com/api"; // this url of backend server

  const [products, setProducts] = useState([]);

  const [spinner,setSpinner] = useState(true);
  //
  const [token, setToken] = useState([]);
  // for user new naviagtion bar
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user,setUser] = useState();
  const [cart,setCart] = useState([]);
  const [reload,setReload] = useState(false);
  const [userAddress,setUserAddress] = useState("")

  useEffect(() => {
    
    
    const fetchProduct = async () => {

      
        
        const api = await axios.get(`${url}/product/all`, {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        });
  
        // console.log(api.data.products);
        setProducts(api.data.products);
        setFilteredData(api.data.products);
        setSpinner(false); 
        userProfile();

      
    };

    fetchProduct();
    userCart();
    getAddress();
  }, [token,reload]);

  // taking token from local storage

  useEffect(()=>{
      let lstoken = localStorage.getItem("token")

      if(lstoken){
        setToken(lstoken);
        setIsAuthenticated(true)
      }

  },[])

  // register user

  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

    // alert(api.data.message);
    // console.log(api.data.message);
    toast(api.data.message);
    return api.data;
  };

  // login user

  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

    // alert(api.data.message);
    toast(api.data.message);
    // console.log(api.data);
    setToken(api.data.token);
    setIsAuthenticated(true);
    // token ko set kar rahe hia local storage me
    localStorage.setItem("token", api.data.token);
    return api.data;
  };

  // logout user

  const logout = ()=>{
    setIsAuthenticated(false);
    setToken(" ");
    localStorage.removeItem("token");
    toast.success("logout successfully");
  }

  // user profile

  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth":token
      },
      withCredentials: true,
    });

    // console.log(api.data.user);
    setUser(api.data.user)
    
  };

  // add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(`${url}/cart/add`,{productId, title, price, qty, imgSrc} ,{
      headers: {
        "Content-Type": "Application/json",
        Auth:token
      },
      withCredentials: true,
    });
      setReload(!reload);
    // console.log("my cart",api);
    toast.success(api.data.message);
    
  };

  //user cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Auth:token
      },
      withCredentials: true,
    });

    console.log("user cart",api.data.cart.items);
        setCart(api.data.cart.items);
        console.log(cart);
    
  };

  // decrease qty

  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(`${url}/cart/--qty`, {productId, qty},{
      headers: {
        "Content-Type": "Application/json",
        Auth:token
      },
      withCredentials: true,
    });

    setReload(!reload)

    // console.log("user cart",api.data.cart.items);
      toast.success(api.data.message);
    //     setCart(api.data.cart.items);
    //     console.log(cart);
    
  };

  //remove cart item
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`,{
      headers: {
        "Content-Type": "Application/json",
        Auth:token
      },
      withCredentials: true,
    });

    setReload(!reload)

    // console.log("user cart",api.data.cart.items);
      toast.success(api.data.message);
    //     setCart(api.data.cart.items);
    //     console.log(cart);
    
  };

  // clear cart

  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`,{
      headers: {
        "Content-Type": "Application/json",
        Auth:token
      },
      withCredentials: true,
    });

    setReload(!reload)

    console.log("user cart",api);
      toast.success(api.data.message);
    
    
  };

  // adding address shiiping

  const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
    const api = await axios.post(`${url}/address/add`,{fullName, address, city, state, country, pincode, phoneNumber},{
      headers: {
        "Content-Type": "Application/json",
        Auth:token
      },
      withCredentials: true,
    });

    setReload(!reload)
        
    // console.log("user address",api.data);
      toast.success(api.data.message);
    return api.data
    
    
  };

  // fetching user address latest

  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`,{
      headers: {
        "Content-Type": "Application/json",
        Auth:token
      },
      withCredentials: true,
    });
    // console.log("user address",api.data.userAddress)
    setUserAddress(api.data.userAddress);
  }

  

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        token,
        url,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        spinner,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
