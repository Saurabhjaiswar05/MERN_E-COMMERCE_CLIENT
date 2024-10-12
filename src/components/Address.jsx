import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";


const Address = () => {

  const {shippingAddress,userAddress} = useContext(AppContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName:"",
    address:"",
    city:"", 
    state:"", 
    country:"", 
    pincode:"" , 
    phoneNumber :""
  });

  const onChangeHandler = (e)=>{
      const {name,value} = e.target
      setFormData({...formData, [name]:value})
  }

  const {fullName, address, city, state, country, pincode, phoneNumber} = formData;  

  const submitHandler = async(e)=>{
      e.preventDefault();
      // alert("your form has been submitted");
    const result =  await shippingAddress(fullName, address, city, state, country, pincode, phoneNumber);
    if(!fullName || !address ||  !city  || !state ||  !country || !pincode || !phoneNumber){
      
    return alert("please fill all the details");
    }
    if(result.success){
      navigate("/checkout");
    }

      // console.log(formData);

      setFormData({
        fullName:"",
        address:"",
        city:"", 
        state:"", 
        country:"", 
        pincode:"" , 
        phoneNumber :""
      })

  }

  return (
    <>
      <div
        className="container my-1 p-4"
        style={{
          border: "2px solid green",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">Shipping address</h1>
        <form onSubmit={submitHandler} className="my-3">
          {/* single row */}

          <div className="row">
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
             Full Name
            </label>
            <input
            name="fullName" 
            value={formData.fullName}
            onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="exampleInputEmail12"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Country
            </label>
            <input
            name="country" 
            value={formData.country}
            onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="exampleInputEmail3"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              State
            </label>
            <input
            name="state" 
            value={formData.state}
            onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="exampleInputPassword4"
            />
          </div>
          </div>

          {/* second row */}

          <div className="row">
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
             City
            </label>
            <input
            name="city" 
            value={formData.city}
            onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="exampleInputEmail12"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Pincode
            </label>
            <input
            name="pincode" 
            value={formData.pincode}
            onChange={onChangeHandler}
              type="number"
              className="form-control bg-dark text-light"
              id="exampleInputEmail3"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              PhoneNumber
            </label>
            <input
            name="phoneNumber" 
            value={formData.phoneNumber}
            onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="exampleInputPassword4"
            />
          </div>
          </div>

          {/* third row */}

          <div className="row">
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address/Nearby
            </label>
            <textarea
            name="address" 
            value={formData.address}
            onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="exampleInputPassword4"
            />
          </div>
          </div>

          <div className="d-grid col-6 mx-auto my-3" >
            <button type="submit" style={{fontWeight:"bold"}} className="btn btn-primary">
              submit
            </button>
          </div>

        </form>
        {
          userAddress && (
            <div className="d-grid col-6 mx-auto my-3" >
          <button className="btn btn-warning" style={{fontWeight:"bold"}} onClick={()=>navigate("/checkout")}>Use old Address</button>
        </div>
          )
        }
        
      </div>
    </>
  );
};

export default Address;
