import React from 'react'
import { Link } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import Card from '../../components/card/Card'
import './auth.css'

function Login() {
  return (
    <section className='auth container'>
        <Card>
        <div className='form'>
            <h2>Login</h2>
            <form action="">
               <input type="email" placeholder='Email'/>
               <input type="password" placeholder='Password'/>
               <button className='--btn --btn-primary --btn-block'>Login</button>
                <div className='links reset'>
                    <Link to="/reset">Forgot Password</Link>
                </div>
            </form>
            <button className='--btn --btn-danger --btn-block'> <FcGoogle /> Login With Google </button>
            <p>Don't have an account?<Link to ="/register">Register</Link> </p>
        </div>
        </Card>
        
        
      
    </section>
  )
}

export default Login
