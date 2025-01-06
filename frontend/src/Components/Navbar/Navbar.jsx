import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';

export default function Navbar({setShowLogin}) {

    const [menu, setMenu] = useState("home");
    const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate('/')
    }

  return (
        <>
            {/* <nav className="navbar navbar-expand-lg">
                <div className="container">
    
                    <a className="navbar-brand" href="#">
                        <img src={assets.logo} alt="Logo" />
                    </a>
    
                    <div className="d-flex align-items-center order-lg-2 ms-auto">
                        <button className="btn me-2">
                            <i className="fas fa-search"></i>
                        </button>
                        <div className="btn me-2 cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <div className="dot"></div>
                        </div>
                        <button className="btn me-2 sign-up-btn">Sign Up</button>
    
                        <button className="navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
    
                    <div className="collapse navbar-collapse order-lg-1" id="navbarNav">
                        <ul className="navbar-nav navbar-menus mx-auto d-flex gap-5">
                            <li onClick={() => setMenu("home")} className={menu==="home" ? "active" : ""}>Home</li>
                            <li onClick={() => setMenu("menu")} className={menu==="menu" ? "active" : ""}>Menu</li>
                            <li onClick={() => setMenu("mobile-app")} className={menu==="mobile-app" ? "active" : ""}>Mobile-App</li>
                            <li onClick={() => setMenu("contact-us")} className={menu==="contact-us" ? "active" : ""}>Contact Us</li>
                        </ul>
                    </div>
                </div>
            </nav> */}

            <div className="navbar-container sticky-top  mb-2 p-1 border-bottom">
                <div className="container">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#"><img src={assets.logo} alt="" /></a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav offset-lg-1 me-auto mb-2 mb-lg-0 d-flex flex-lg-row gap-4 mt-3 mt-lg-0 flex-column">
                                    <li onClick={() => setMenu("home")} className={menu==="home" ? "active" : ""}><Link to='/' >Home</Link></li>
                                    <li onClick={() => setMenu("menu")} className={menu==="menu" ? "active" : ""}><a href='#explore-menu'>Menu</a></li>
                                    <li onClick={() => setMenu("mobile-app")} className={menu==="mobile-app" ? "active" : ""}><a href='#app-download'>Mobile-App</a></li>
                                    <li onClick={() => setMenu("contact-us")} className={menu==="contact-us" ? "active" : ""}><a href='#contact-us'>Contact Us</a></li>
                                </ul>
                                <form className="d-flex search-form mt-lg-0 mt-5" role="search">
                                    <input className="form-control rounded-5 me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-tomato rounded-5" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                                </form>
                                <div className="cart ms-lg-4 mt-lg-0 mt-5">
                                    <Link to='/cart' onClick={() => setMenu("cart")} className={menu==="cart" ? "cart-active" : ""}><i className="fa-solid fa-cart-shopping"></i></Link>
                                    <i className={getTotalCartAmount()?"fa-solid fa-circle dot-icon":"fa-solid fa-circle dot-icon d-none"}></i>
                                </div>
                                {!token ? <div className="signup-btn ms-lg-3 mt-lg-0 mt-5">
                                    <button className="btn btn-tomato rounded-5" onClick={() => setShowLogin(true)}>Sign In</button>
                                </div> : 
                                <div className="signup-btn ms-lg-3 mt-lg-0 mt-5">
                                <div className="nav-item dropdown">
                                    <i className="fa-solid fa-user user-icon" data-bs-toggle="dropdown" role="button" aria-expanded="false"></i>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li className="dropdown-item order-dropdown" onClick={() => navigate('/myorders')}>
                                            <i className="fa-solid fa-bag-shopping user-icon"></i> <span>Orders</span>
                                        </li>
                                        <li className="dropdown-item logout-dropdown" onClick={logout}>
                                            <i className="fa-solid fa-arrow-right-from-bracket user-icon"></i> <span>Logout</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>} 
                                
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
  )
}
