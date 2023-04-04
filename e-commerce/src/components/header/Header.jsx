import React, {useState} from 'react'
import {Link, NavLink } from 'react-router-dom'
import {FaShoppingBag, FaTimesCircle} from 'react-icons/fa'
import {HiMenuAlt1 } from 'react-icons/hi'
import './Header.css'
import logol from '../../assets/logol.png'


const logo = (
    <div className='logo'>
    <Link to="/">
        <img src={logol} alt='logo' />
    </Link>
  </div>
)




function Header() {

  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    setShowMenu(false)
  }


  const activeLink = ({isActive})=>(isActive ? 'active' : '')

  const cartBag = (
    <span className='cart'>
    <NavLink to="/cart" className={activeLink}>
      <FaShoppingBag size={25} />
      <p>0</p>
    </NavLink>
    </span>
  )

  return (
    <div>
      <header>
        <div className='header'>
          {logo}
          <nav className={ showMenu ? 'show-nav' : 'hide-nav'}>
             <div className={showMenu ? 'nav-wrapper show-nav-wrapper': 'nav-wrapper'} onClick={hideMenu} ></div>
              <ul onClick={hideMenu}>
                <li className='logo-mobile'>
                  <Link to="/">
                    <img src={logol} alt='logo' />
                  </Link>
                  <FaTimesCircle  size={25} color='3b3e3d' onClick={hideMenu}/>
                </li>
                <li>
                  <NavLink to="/" className={activeLink}> Home </NavLink>
                </li>
                <li>
                  <NavLink to="/about"className={activeLink} > About </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={activeLink}> Contact</NavLink>
                </li>
              </ul>


              <div className='header-right' onClick={hideMenu}>
                  <span className='links'>
                    <NavLink to="/login" className={activeLink}>
                      Login
                    </NavLink>
                    <NavLink to="/register" className={activeLink}>
                      Register
                    </NavLink>
                    <NavLink to="/order-history" className={activeLink}>
                      My orders
                    </NavLink>

                  </span>

                  {cartBag}

                  
              </div>
            
          </nav>

          <div className='menu-icon'>
            {cartBag}
            <HiMenuAlt1  size={25} onClick={toggleMenu} />
          </div>

        </div>

      </header>
    </div>
  )
}

export default Header
