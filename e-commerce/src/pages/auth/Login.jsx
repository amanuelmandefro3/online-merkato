import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import {toast, ToastContainer } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase/config'
import Card from '../../components/card/Card'
import './auth.css'

function Login() {
  //usestate of login component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  //
  const navigate = useNavigate()

  

  //function to handle login submit button
  const userLogin = (event)=>{
    event.preventDefault();
    setIsLoading(true)
    


    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
       
      const user = userCredential.user;
      setIsLoading(false)
      toast.success("Login successful")
      navigate('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      toast.error(error.message)
      setIsLoading(false)
    });
   
  }
  //login with google function
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = ()=>{
    //event.preventDefault();
    setIsLoading(true)
    signInWithPopup(auth, provider)
    .then((result) => {

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setIsLoading(false)
      toast.success("Login successful")
      navigate('/')
    }).catch((error) => {
      const errorCode = error.code;
      //const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      setIsLoading(false)
      toast.error(error.message)
    });

  }


//return of login component 
  return (
    <>
    <ToastContainer />
    {isLoading && <Loader />}
    <section className='auth container'>
        <Card>
        <div className='form'>
            <h2>Login</h2>
            <form action="" onSubmit={userLogin}>
               <input type="email" placeholder='Email' required value={email} onChange={(event) => setEmail(event.target.value)} />
               <input type="password" placeholder='Password' required value={password} onChange = {(event) => setPassword(event.target.value)} />
               <button className='--btn --btn-primary --btn-block' type="submit">Login</button>
                <div className='links reset'>
                    <Link to="/reset">Forgot Password</Link>
                </div>
            </form>
            <button className='--btn --btn-danger --btn-block'
            onClick={loginWithGoogle}> <FcGoogle /> Login With Google </button>
            <p>Don't have an account?<Link to ="/register">Register</Link> </p>
        </div>
        </Card>
        
        
      
    </section>
    </>
  )
}

export default Login
