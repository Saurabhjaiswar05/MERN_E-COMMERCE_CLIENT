import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const TableProducts = ({ cart }) => {
  const { decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
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

  return (
    <>
      <table className="table table-bordered border-primary text-center">
        <thead>
          <tr>
            <th scope="col" className="bg-dark text-light">
              Product Img
            </th>
            <th scope="col" className="bg-dark text-light">
              Title
            </th>
            <th scope="col" className="bg-dark text-light">
              Price
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty++
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty--
            </th>
            <th scope="col" className="bg-dark text-light">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((product) => (
            <tr key={product._id}>
              <th scope="row" className="bg-dark text-light">
                <img
                  src={product.imgSrc}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                />
              </th>
              <td className="bg-dark text-light">{product.title}</td>
              <td className="bg-dark text-light">{product.price}</td>
              <td className="bg-dark text-light">{product.qty}</td>
              <td className="bg-dark text-light">
                <span style={{cursor:"pointer"}} className="material-symbols-outlined" onClick={() =>
                      addToCart(
                        product.productId,
                        product.title,
                        product.price / product.qty,
                        1,
                        product.imgSrc
                      )
                    }>add_circle</span>
              </td>
              <td className="bg-dark text-light">
                <span style={{cursor:"pointer"}} class="material-symbols-outlined" onClick={() => decreaseQty(product.productId, 1)}>do_not_disturb_on</span>
              </td>
              <td className="bg-dark text-light">
                <span style={{cursor:"pointer"}} class="material-symbols-outlined" onClick={() => {
                      if (confirm("Are your sure,want to remove from cart")) {
                        removeFromCart(product.productId);
                      }
                    }}>delete</span>
              </td>
            </tr>
          ))}

          <tr>
            <th scope="row" className="bg-dark text-light"></th>
            <td className="bg-dark text-light">
              <button className="btn btn-primary">Total</button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-warning">{price}</button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-info">{qty}</button>
            </td>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableProducts;
