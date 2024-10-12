import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart ,clearCart} =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart) {
      for (let i = 0; i < cart?.length; i++) {
        qty += cart[i].qty;
        price += cart[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  return (
    <>

    {
      cart?.length == 0 ? (
        <div className="text-center my-5">
              <Link to={"/"} className="btn btn-warning mx-3" style={{fontSize:"1.2rem", fontWeight:"bold"}}>
              Continue shopping...</Link>
        </div>
        
      ) : (
        <>
              <div className="my-5 text-center">
        <button
          className="btn btn-info mx-3"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Total Qty :-{qty}
        </button>
        <button
          className="btn btn-warning mx-3"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Total Price :-{price}
        </button>
      </div>
        </>
      )
    }
      <div>
        {cart?.map((product) => {
          return (
            <div
              key={product._id}
              className="container p-3 bg-dark my-5 text-center"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div className="cart_img">
                  <img
                    src={product.imgSrc}
                    alt=""
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="cart_des">
                  <h2>{product.title}</h2>
                  <h4>{product.price}</h4>
                  <h4>Qty :-{product.qty}</h4>
                </div>
                <div className="cart_action">
                  <button
                    className="btn btn-warning mx-3"
                    style={{ fontWeight: "bold" }}
                    onClick={() => decreaseQty(product.productId, 1)}
                  >
                    Qty--
                  </button>
                  <button
                    className="btn btn-info mx-3"
                    style={{ fontWeight: "bold" }}
                    onClick={() =>
                      addToCart(
                        product.productId,
                        product.title,
                        product.price / product.qty,
                        1,
                        product.imgSrc
                      )
                    }
                  >
                    Qty++
                  </button>
                  <button
                    className="btn btn-danger mx-3"
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      if (confirm("Are your sure,want to remove from cart")) {
                        removeFromCart(product.productId);
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
        {
          cart?.length > 0 && (
            <div className="container text-center my-3">
            <button className="btn btn-warning mx-3" style={{fontWeight:"bold"}}
            onClick={()=>navigate("/shipping")}>Checout</button>
            <button className="btn btn-danger mx-3" style={{fontWeight:"bold"}}
            onClick={()=>{
              if(confirm("are you sure ,want to clear cart...?")){
                clearCart();
              }
            }}>Clear Cart</button>
          </div>
          )
        }
        
    </>
  );
};

export default Cart;
