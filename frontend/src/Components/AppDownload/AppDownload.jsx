import React from 'react';
import './AppDownload.css'
import { assets } from '../../assets/assets';

export default function AppDownload() {
  return (
    <>
        <div className="app-download mt-3" id='app-download'>
            <p className='h1 mt-5'>For Batter Experience Download <br /> Tomato App</p>
            <div className="app-download-plateforms">
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
        </div>
    </>
  )
}
