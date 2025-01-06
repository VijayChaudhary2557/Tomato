import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import Cart from "./Pages/Cart/Cart"
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder"
import Footer from "./Components/Footer/Footer"

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import LoginPopup from "./Components/LoginPopup/LoginPopup"
import Verify from "./Pages/Verify/Verify"
import MyOrders from "./Pages/MyOrders/MyOrders"



function App() {

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false,     // Whether animation happens only once
    });
  }, []);


  return (
    <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
      <div>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/order" element={<PlaceOrder/>} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/myorders" element={<MyOrders/>} />
        </Routes>
       </div>
       <Footer/>
    </>
  )
}

export default App
