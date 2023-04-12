import React from 'react'
import  ReactDOM  from 'react-dom'
import './Loader.css'
import loader from '../../assets/loader.webp'

function Loader() {
  return ReactDOM.createPortal (
    <div className='wrapper'>
      <div className='loader'>
            <img src={loader} alt='loading....' />
      </div>
    </div>, document.getElementById('loader')
  )
}

export default Loader
