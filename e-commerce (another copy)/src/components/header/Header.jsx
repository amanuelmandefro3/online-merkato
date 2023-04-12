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
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice';
import  ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
import { useSelector } from "react-redux";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice"
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";


const logo = (
    <div className='logo'>
    <Link to="/">
        <img src={logol} alt='logo' />
    </Link>
  </div>
)

const activeLink = ({ isActive }) => (isActive ? `active` : "");


function Header() {
  //Use State declerations
  const [showMenu, setShowMenu] = useState(false)
  const [displayName, setdisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);
  //const [isLoggedIn,setIsLoggedIn] = useState(false)


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);

    // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        if (user.displayName == null) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        } else {
          setdisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    setShowMenu(false)
  }

  //function for logging out the application

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  



  //cart  variable creation
  const cartBag = (
    <span className='cart'>
    <Link to="/cart" className={activeLink}>
      <FaShoppingBag size={25} />
          <p>{cartTotalQuantity}</p>
    </Link>
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


                {/* admin will be added here  */}
                <AdminOnlyLink>
                  <Link to="/admin/*">
                    <button className="--btn --btn-primary">Admin</button>
                  </Link>
                </AdminOnlyLink>


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
                <ShowOnLogout>
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                </ShowOnLogout>
                
                <ShowOnLogout>
                  <NavLink to="/register" className={activeLink}>
                    Register
                  </NavLink>
                </ShowOnLogout>

                <ShowOnLogin>
                  <a href="#home" style={{ color: "#ff7722" }}>
                    <FaUserAlt size={16} />
                    {displayName}
                  </a>
                </ShowOnLogin>
                <ShowOnLogin>
                  <NavLink to="/order-history" className={activeLink}>
                    My Orders
                  </NavLink>
                </ShowOnLogin>
                <ShowOnLogin>
                  <NavLink to="/" onClick={logoutUser}>
                    Logout
                  </NavLink>
                </ShowOnLogin>
              </span>
                  <ShowOnLogin>
                  <NavLink to="/cart" className={activeLink}>
                    {cartBag} 
                  </NavLink>
                  
                  </ShowOnLogin>
                   
                  

                  
              </div>
            
          </nav>

          <div className='menu-icon'>
              <ShowOnLogin>
                  {cartBag}
              </ShowOnLogin>
              
            <HiMenuAlt1  size={25} onClick={toggleMenu} />
          </div>

        </div>

      </header>
    </div>
  )
}

export default Header
