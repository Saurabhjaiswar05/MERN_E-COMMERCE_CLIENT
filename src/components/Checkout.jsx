import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import TableProducts from "./TableProducts";
import axios from "axios";

const Checkout = () => {
  const { cart, userAddress, url, user } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

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

  // foe payment click
  // const handlePayment = async () => {
  //   try {
  //     const orderRepons = await axios.post(`${url}/payment/checkout`, {
  //       amount: price,
  //       cartItems: cart?.items,
  //       userShipping: userAddress,
  //       userId: user._id,
  //     });
  //     // console.log("response",orderRepons.data)
  //     const { orderId, amount: orderAmount } = orderRepons.data;
  //     // now write the code of razorpay

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // temprary
  const handlePayment = ()=>{
    alert("Required payment gateway to proceed futher please contact to developer...!")
  }

  return (
    <>
      <div className="container  my-3">
        <h1 className="text-center">Order Summary</h1>

        <table className="table table-bordered border-primary">
          <thead className="text-center">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Product Details
              </th>

              <th scope="col" className="bg-dark text-light text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-dark text-light">
                <TableProducts cart={cart} />
              </td>
              <td className="bg-dark text-light">
                <ul>
                  <li>Name : {userAddress.fullName}</li>
                  <li>Phone : {userAddress.phoneNumber} </li>
                  <li>Country : {userAddress.country}</li>
                  <li>State :{userAddress.state} </li>
                  <li>City : {userAddress.city}</li>
                  <li>Pincode :{userAddress.pincode} </li>
                  <li>Nearby : {userAddress.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg "
          style={{ fontWeight: "bold" }}
          onClick={handlePayment}  //use when payment gatway run
        >
          Procced To Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
