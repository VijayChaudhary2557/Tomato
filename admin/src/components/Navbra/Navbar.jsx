import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/admin_assets/assets';

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg border sticky-top">
        <div className="container">
          <div className="navbar-brand">
            <img src={assets.logo} alt="" />
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav ms-lg-auto ms-0 my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <img src={assets.profile_image} alt="" />
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Admin
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#">Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
