import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

export default function LoginPopup({setShowLogin}) {

    const [currentState, setCurrentState] = useState("Login");

    const {url, setToken} = useContext(StoreContext);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData((prev) => ({...prev, [name] : value}));
    }


    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if(currentState==='Login') {
            newUrl += "api/user/login";
        }
        else {
            newUrl += "api/user/register"
        }

        const response = await axios.post(newUrl, data);

        if(response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }
    }


  return (
    <div className="login-popup">
        <form data-aos="zoom-in" onSubmit={onLogin} className="login-popup-container bg-light border rounded-3 p-3 w-25 d-flex flex-column gap-3 ">
            <div className="login-popup-title d-flex justify-content-between align-items-center">
                <h2 className='fw-bold text-dark'>{currentState}</h2>
                {/* <img src={assets.cross_icon} onClick={() => setShowLogin(false)} /> */}
                <i class="fa-solid fa-xmark cross fs-4" onClick={() => setShowLogin(false)}></i>
            </div>
            <div className="login-popup-inputs mt-1">
                {currentState==='Login' ? <></> : <input className='form-control' onChange={onChangeHandler} value={data.name} type="name" placeholder='Enter Name' name='name' required />}
                <input className='form-control mt-3' type="email" placeholder='Enter Email' onChange={onChangeHandler} value={data.email} name='email' required />
                <input className='form-control mt-3' type="password" placeholder='Password' onChange={onChangeHandler} value={data.password} name='password' required />
            </div>
            <button type='submit' className='btn btn-tomato'>{currentState==='Sign Up'?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <span className='ms-2'>By continuing, I agree to the terms of use and privacy policy.</span>
            </div>
            {currentState==='Login'?
                <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                :
                <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>            
            }
        </form>
    </div>
  )
}
