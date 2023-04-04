import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'

function Reset() {
    return (
        <section className='auth container'>
            <Card>
            <div className='form'>
                <h2>Forgot Password</h2 >
                <form action="">
                   <input type="email" placeholder='Email'/>
                   <button className='--btn --btn-primary --btn-block'>Forgot password</button>  

                   <div className='links'>
                       <Link to='/login'>Login</Link>
                       <Link to='/register'>Register</Link>
                   </div>

                </form>
                
            </div>
            </Card>
            
            
          
        </section>
      )
    }

export default Reset
