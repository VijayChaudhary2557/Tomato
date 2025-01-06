import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/admin_assets/assets';
import { Link } from 'react-router-dom';
import { SidebarContext } from '../../Context/SidebarContext';


export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

  return (
    <>
      <div className={isSidebarOpen ? "sidebar large-sidebar sticky-bottom" : "sidebar"}>
        <button className='btn tomato-btn sidebar-btn' onClick={toggleSidebar}><i className="fa-solid fa-bars"></i></button>
        
        <div className={isSidebarOpen ? "sidebar-options ms-5" : "sidebar-options ms-5 d-none"}>
          <Link to='/add'>
            <div className="sidebar-option mt-5">
              <i className="fa-solid fa-plus"></i>
              <p className=''>Add Items</p>
            </div>
          </Link>
          <Link to='/list'>
            <div className="sidebar-option">
              <i className="fa-solid fa-list"></i>
              <p>List Items</p>
            </div>
          </Link>
          <Link to='/order'>
          <div className="sidebar-option">
              <i className="fa-solid fa-cart-shopping"></i>
              <p>Orders</p>
          </div>
          </Link>
        </div>
      </div>
    </>
  );
}
