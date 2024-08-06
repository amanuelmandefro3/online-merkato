import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth}  from '../../firebase/config'
import Card from '../../components/card/Card'
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Reset() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email for a reset link");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
    return (
        <>
        <ToastContainer/>
        {isLoading && <Loader />}
        <section className='auth container'>
            <Card>
            <div className='form'>
                <h2>Forgot Password</h2 >
                <form action="" onSubmit={resetPassword}>
                   <input type="email" placeholder='Email' value= {email} onChange = {(event)=>setEmail(event.target.value)}/>
                   <button className='--btn --btn-primary --btn-block' type='submit'>Forgot password</button>  

                   <div className='links'>
                       <Link to='/login'>Login</Link>
                       <Link to='/register'>Register</Link>
                   </div>

                </form>
                
            </div>
            </Card>
            
            
          
        </section>
        </>
      )
    }

export default Reset
