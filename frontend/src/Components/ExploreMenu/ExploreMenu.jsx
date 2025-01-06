import React from 'react'
import {menu_list} from '../../assets/assets'
import './ExploreMenu.css'

export default function ExploreMenu({category, setCategory}) {
  return (
    <div className='explore-menu d-flex flex-column'>
        <h1 className=''>Explore our menu</h1>
        <p className='explore-menu-text w-100'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <div className="explore-menu-list d-flex justify-content-between gap-5 text-center">
            { menu_list.map((item, index) => {
                return (
                    <div key={index} onClick={() => setCategory(prev => prev===item.menu_name?"All": item.menu_name)} className="explore-menu-list-item">
                        <img className={category===item.menu_name?"menu-active": ""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            }) }
        </div>
        <hr />
    </div>
  )
}
