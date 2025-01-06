import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
export default function Footer() {
  return (
    <>
        <div className="container-fluid footer-container mt-5" id='contact-us'>
            <footer className="text-center pt-3 text-lg-start text-white">
            <section className="">
              <div className="container text-center text-md-start mt-5">
                
                <div className="row mt-3">
                  
                  <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                    <h6 className="text-uppercase fw-bold"><img src={assets.logo} alt="" /></h6>
                    <p className="mt-3 gray">
                      Here you can use rows and columns to organize your footer
                      content. Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit.
                    </p>
                    <div className="social-links d-flex justify-content-center">
                      <p className='ms-2'>
                        <a href="" className="me-4">
                          <i class="fa-brands fa-facebook"></i>
                        </a>
                      </p>
                      <p className='ms-2'>
                        <a href="" className="me-4">
                          <i class="fa-brands fa-twitter"></i>
                        </a>
                      </p>
                      <p className='ms-2'>
                        <a href="" className="me-4">
                          <i class="fa-brands fa-linkedin"></i>
                        </a>
                      </p>
                    </div>
                  </div>
                  


                  <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                    <h6 className="text-uppercase font-high fw-bold mb-4">COMPANY</h6>
                    <p>
                      <a href="#!" className="gray">Home</a>
                    </p>
                    <p>
                      <a href="#!" className="gray">About Us</a>
                    </p>
                    <p>
                      <a href="#!" className="gray">Delivery</a>
                    </p>
                    <p>
                      <a href="#!" className="gray">Privacy Policy</a>
                    </p>
                  </div>

                  
                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    <h6 className="text-uppercase font-high fw-bold mb-4">GET IN TOUCH</h6>
                    <p className="contect-icon gray"><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                    <p className="contect-icon gray"><i className="fas fa-envelope mr-3"></i> info@example.com</p>
                  </div>
                  
                </div>
                
              </div>
            </section>
          </footer>
        </div>
        <div className="container-fluid copyright">
            <div
                 className="text-center p-3"
                 >
                Copyright 2024 © Tomato.com - All Right Reserved
            </div>
        </div>
    </>
  )
}
