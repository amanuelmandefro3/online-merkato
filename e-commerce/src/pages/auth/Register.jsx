import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'

function Register() {
    return (
        <section className='auth container'>
            <Card>
            <div className='form'>
                <h2>Register</h2>
                <form action="">
                   <input type="email" placeholder='Email'/>
                   <input type="password" placeholder='Password'/>
                   <input type="password" placeholder='Confirm Password' />
                   <button className='--btn --btn-primary --btn-block'>Register</button>  
                   <p>Already have an account? <Link to='/login'>Login</Link></p>
                </form>
                
            </div>
            </Card>
            
            
          
        </section>
      )
}

export default Register
