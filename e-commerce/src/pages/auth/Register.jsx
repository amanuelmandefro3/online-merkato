import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase/config'
import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader';


function Register() {
    //useStates decleation
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    //navigate
    const navigate = useNavigate();

    //function that used to handle submit button
    const registerUser = (event)=>{
        event.preventDefault();
        if(password!== confirmationPassword){
            toast.error("Passwords do not match");
        }
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setIsLoading(false);
            toast.success("Registration successful");
            navigate("/login");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            toast.error(error.message)
            setIsLoading(false);
            // ..
        });
    }

    //return of the register component


    return (
        <>
        <ToastContainer />
        {isLoading && <Loader/>}
        <section className='auth container'>
            <Card>
            <div className='form'>
                <h2>Register</h2>
                <form action="" onSubmit={registerUser}>
                   <input type="email" placeholder='Email' required value = {email} onChange={(event) => setEmail(event.target.value)} />

                   <input type="password" placeholder='Password' required value={password} onChange={(event)=> setPassword(event.target.value)} />

                   <input type="password" placeholder='Confirm Password' required value={confirmationPassword} onChange={(event) => setConfirmationPassword(event.target.value)} />


                   <button className='--btn --btn-primary --btn-block' type = "submit">Register</button>  
                   <p>Already have an account? <Link to='/login'>Login</Link></p>
                </form>
                
            </div>
            </Card>
            
            
          
        </section>
        </>
      )
}

export default Register
