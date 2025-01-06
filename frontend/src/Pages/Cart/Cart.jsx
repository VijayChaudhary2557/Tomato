import React, { useContext } from 'react';
import './Cart.css';
import {StoreContext} from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const {cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <>
      <div className="cart mt-5">
        <table className="cart-items container table table-hover">
          <thead>
            <tr>
              <th scope="col-2">Items</th>
              <th scope="col-2">Title</th>
              <th scope="col-2">Price</th>
              <th scope="col-2">Quantity</th>
              <th scope="col-2">Total</th>
              <th scope="col-2">Remove</th>
            </tr>
          </thead>
          <tbody>
          {food_list.map((item, index) => {
            if(cartItems[item._id] > 0) {
              return (
                <tr className='rol'>
                  <td scope='row' className="col-2 align-self-center cart-item-img"><img className='cart-img' src={url+'uploads/'+item.image} /></td>
                  <td className="col-2 align-self-center">{item.name}</td>
                  <td className="col-2 align-self-center">${item.price}</td>
                  <td className="col-2 align-self-center">{cartItems[item._id]}</td>
                  <td className="col-2 align-self-center">{item.price * cartItems[item._id]}</td>
                  <td className="col-2 align-self-center cart-cross"><i onClick={() => removeFromCart(item._id)} class="fa-solid fa-xmark"></i></td>
                </tr>
              )
            }
          })}
          </tbody>
        </table>
      </div>
      <div className="cart-bottom container d-lg-flex mt-3">
        <div className="cart-total d-flex col-lg-6 p-5 flex-column gap-3">
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
          <button className='btn btn-tomato w-50' onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode col-lg-6 p-5 mt-5">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input input-group">
              <input type="text" placeholder='Enter Promo Code' className='form-control' />
              <input type='button' className='btn btn-dark' value={'Submit'} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
