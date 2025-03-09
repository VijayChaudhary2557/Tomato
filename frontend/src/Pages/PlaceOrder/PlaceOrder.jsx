import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PlaceOrder() {
  const {cartItems, food_list, removeFromCart, getTotalCartAmount, token, url} = useContext(StoreContext); 
  
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({...data, [name]: value}));
  }

  const placeOrder = async (event) => {
    event.preventDefault();

    console.log('Yess');

    let orderItems = [];

    food_list.map((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })


    
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    
    console.log(orderData);

    let response = await axios.post(url+"api/order/place", orderData, {headers: {token}});

    console.log(response.data);

    if(response.data.success) {
      console.log(response.data);
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      console.log(response.data);
      alert('Error');
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if(!token) {
      navigate('/cart');
    }
    else if(getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token]);


  return (
    <>
      <form onSubmit={placeOrder} className='place-order container d-flex flex-lg-row flex-md-row flex-column'>
        <div className="place-order-left w-100">
          <h2 className="title fs-2 text-center">Delivery Information</h2>
          <div className="row mt-3 mb-3">
            <div className="col-lg-6 col-md-6">
              <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} className='form-control' placeholder='First Name' />
            </div>
            <div className="col-lg-6 col-md-6">
              <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} className='form-control mt-3 mt-lg-0 mt-md-0' placeholder='Last Name' />
            </div>
          </div>
          <div className="row mt-3 mb-3">
            <div className="col">
              <input type="email" className='form-control' name='email' onChange={onChangeHandler} value={data.email} placeholder='Email Address' />
            </div>
          </div>
          <div className="row mt-3 mb-3">
            <div className="col">
              <input type="text" className='form-control' name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
            </div>
          </div>
          <div className="row mt-3 mb-3">
            <div className="col-lg-6 col-md-6">
              <input type="text" name='city' onChange={onChangeHandler} value={data.city} className='form-control' placeholder='City' />
            </div>
            <div className="col-lg-6 col-md-6">
              <input type="text" name='state' onChange={onChangeHandler} value={data.state} className='form-control mt-3 mt-lg-0 mt-md-0' placeholder='State' />
            </div>
          </div>
          <div className="row mt-3 mb-3">
            <div className="col-lg-6 col-md-6">
              <input type="number" name='zipcode' onChange={onChangeHandler} value={data.zipcode} className='form-control' placeholder='Zip Code' />
            </div>
            <div className="col-lg-6 col-md-6">
              <input type="text" name='country' onChange={onChangeHandler} value={data.country} className='form-control mt-3 mt-lg-0 mt-md-0' placeholder='Country' />
            </div>
          </div>
          <div className="row mt-3 mb-3">
            <div className="col">
              <input type="number" className='form-control' name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
            </div>
          </div>
        </div>
        <div className="place-order-right w-100">
          <div className="cart-total d-flex col-lg-12 p-5 flex-column gap-3">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details d-flex justify-content-between text-secondary">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details d-flex justify-content-between text-secondary">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details d-flex justify-content-between text-secondary">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type='submit' className='btn btn-tomato w-50 mt-5'>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  )
}
