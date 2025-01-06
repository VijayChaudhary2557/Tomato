import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'
export default function Header() {
  return (
    <>
      <div data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
        <div className="img">
            <img src={assets.header_img} alt="" />
        </div>
        <div className='header ms-4'  >
            <div className="header-contents w-100">
                <h2>Order Your Favourite <br /> Food Here...</h2>
                <p className=''>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button>View Menu</button>
                <p id='explore-menu'></p>
            </div>
        </div>
      </div>
    </>
  )
}
