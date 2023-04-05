import React, {useState, useEffect} from 'react'
import {Link, NavLink , useNavigate} from 'react-router-dom'
import {FaShoppingBag, FaTimesCircle, FaUserAlt} from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify';
import {HiMenuAlt1 } from 'react-icons/hi'
import {signOut, onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase/config'
import './Header.css'
import logol from '../../assets/logol.png'
import Loader from '../loader/Loader';


const logo = (
    <div className='logo'>
    <Link to="/">
        <img src={logol} alt='logo' />
    </Link>
  </div>
)




function Header() {
  //Use State declerations
  const [showMenu, setShowMenu] = useState(false)
  const [user, setUser] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  const navigate = useNavigate()

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    setShowMenu(false)
  }

  //function for logging out the application

  const userLogOut = (event) => {
    event.preventDefault()

    setLoading(true)

    signOut(auth).then(() => {
      toast.success('Logout successful')
      setIsLoggedIn(false)
      setLoading(false)
    
      navigate('/')
    }).catch((error) => {
      setLoading(false)
      toast.error(error.message)
    });
  }

  useEffect(() => {
    

    //Monitorcurrently signed in user
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user.displayName)
        setIsLoggedIn(true)
       
      } else {
        setUser("")
      }
    });
  }, [])

  //checking w/c of the current nav is active
  const activeLink = ({isActive})=>(isActive ? 'active' : '')


  //cart creation variable
  const cartBag = (
    <span className='cart'>
    <NavLink to="/cart" className={activeLink}>
      <FaShoppingBag size={25} />
      <div className='cart-content'>
          <p>0</p>
      </div>
     
    </NavLink>
    </span>
  )

  //return of Header component
  return (
    <div>

      <header>
        <ToastContainer />
        {isLoading && <Loader />}
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
                    {!isLoggedIn && <NavLink to="/login" className={activeLink}>
                      Login
                    </NavLink>}
                    {isLoggedIn && <span style = {{fontSize: "15px"}}>
                      <FaUserAlt size = {25} /> {user}
                    </span>}
                    {!isLoggedIn &&<NavLink to="/register" className={activeLink}>
                      Register
                    </NavLink>}
                     {isLoggedIn && <NavLink to="/order-history" className={activeLink}>
                      My orders
                    </NavLink>}
                    {isLoggedIn && <NavLink to="/" className={activeLink} onClick = {userLogOut}>
                      Logout
                    </NavLink>}

                  </span>
                  {isLoggedIn && <div>
                   {cartBag}
                  </div>}
                  

                  
              </div>
            
          </nav>

          <div className='menu-icon'>
            
            {isLoggedIn && <div>{cartBag}</div>}
            <HiMenuAlt1  size={25} onClick={toggleMenu} />
          </div>

        </div>

      </header>
    </div>
  )
}

export default Header
