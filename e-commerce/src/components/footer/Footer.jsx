import React from 'react'
import {FaFacebookF, FaInstagram, FaTelegram, FaRegCopyright} from 'react-icons/fa'
import {BsFillTelephoneFill} from 'react-icons/bs'
import emailjs from 'emailjs-com'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
    <div className='footer'>
      <div className='footer-1'>
        <h2>About</h2>
        <p>our online store was founded by a group of professional dedicated to designing innovative and sustainable products that stand the test of time. With our exceptional service and attention to detail, we gurantee that shopping experience will be seamless from start to finish. Take a look at our site to learn more about our brand and quality standards</p>
      </div>
      <div className='footer-2'>
        <h2>Contact us</h2>
        <p>Online Merkato</p>
        <p> <BsFillTelephoneFill/> <a href='tel: +25112345678'> +25112345678</a></p>
        <p> <a href='https://mail.google.com/mail/u/0/#advanced-search/to=amanuelmandefrow%40gmail.com&query=in%3Asent&isrefinement=true&todisplay=Amanuel+Mandefrow?compose=new' target={'_blank'}>Email: info-onlinemerkato@gmail.com </a></p>
        
        <p></p>
        
        <div className='social-media'>
          <span> <a href='https://facebook.com/' target={'_blank'}><FaFacebookF/></a> </span>
          <span><a href='https://instegram.com/' target={'_blank'}><FaInstagram/></a></span>
          <span> <a href='https://web.telegram.org/' target={'_blank'}><FaTelegram/></a></span>
        </div>
      </div>
      {/* <div className='footer-3'>
        <p>Subscribe to our Newsletter</p>
        <p>Input form goes here! <button className='btn'>Join</button></p>
        
      </div> */}
  
    </div>
    <div>
      <p style={{textAlign : "right", paddingRight: "10px"}}>Powered by <a href=""className='dev' >Amanuel Mandefrow</a></p>
    </div>
    <div className='copy-right-tag'> &copy; {year} online Merkato All Rights Reserved</div>
    </footer>
  )
}

export default Footer
