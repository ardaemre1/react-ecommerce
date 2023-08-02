import React, { useState } from "react";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import loginImage from '../images/img.png'
import '../screens/login.css'
import { motion, AnimatePresence } from "framer-motion"
import Logo from '../images/logo.png'
import { AiFillGoogleCircle } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import {provider} from "../firebaseConfig";
import "react-toastify/dist/ReactToastify.css";
import {toast, ToastContainer} from "react-toastify";
import {Link,useNavigate} from "react-router-dom";


const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [value, setValue] = useState('');
  const auth = getAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const createUserWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setValue(user.email);
        toast.success("Kayıt Başarılı, Giriş Sayfasına Yönlendiriliyorsunuz")

        console.log("User created:", user.email);

        setTimeout(() => {
              setIsRegistered(true);
              navigate('/login')
          },2000)

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user:", errorCode, errorMessage);
        toast.error(errorMessage)
      });
  };

  return (
    <div className='flex w-full h-full justify-center items-center'>
      <div className='lg:w-8/12 h-screen flex justify-center items-center tablet-container'>

        <div className='flex flex-col w-11/12 h-5/6 items-center justify-center p-5 shadow-lg'>
            <div className='flex flex-col gap-1'>
                <motion.img initial={{ opacity: 0, x: 20 }}  animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }} src={Logo} className='logo'/>
                <p className='welcome-text'>Welcome Back!</p>
                <h1 className='sing-text'>Sing In</h1>
                <label>Email</label>
                <input type='email' className='rounded-md p-1 bg-bg-right' onChange={(e) => {setEmail(e.target.value)}}/>

                <label>Password</label>
                <input type='password' className='rounded-md p-1 bg-bg-right' onChange={(e) => {setPassword(e.target.value)}}/>

                <button onClick={createUserWithEmail} type='submit' className='border p-1 rounded-xl mt-3 bg-bg-right'>SING UP</button>

                  <p className='flex justify-center items-center account mt-5'>
                  Do you have account ? <Link to="/login" className='sign pl-1 bg-blue'>Sign up</Link>
                </p>
            </div>
        </div>
      </div>
      <div className='right-content hidden md:block w-4/12 h-screen flex justify-center items-center bg-bg-right center'>
        <img className='image' src={loginImage} alt='Giriş' />
      </div>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Register;
