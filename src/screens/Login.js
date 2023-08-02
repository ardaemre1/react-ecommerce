import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import loginImage from '../images/img.png'
import '../screens/login.css'
import Logo from '../images/logo.png'
import { AiFillGoogleCircle } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from 'react-icons/fc';
import { provider } from "../firebaseConfig";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion"
import { toast, ToastContainer } from "react-toastify";
import Register from "./Register";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [value, setValue] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Kullanıcı oturum durumunu takip et
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Kullanıcı oturum açmışsa ana sayfaya yönlendir
        setIsLoggedIn(true);
        navigate('/home');
      } else {
        // Kullanıcı oturum açmamışsa isLoggedIn durumunu sıfırla
        setIsLoggedIn(false);
      }
    });

    // Aboneliği temizle
    return () => unsubscribe();
  }, [auth, navigate]);

  const signUpUserWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Giriş yapıldı! Ana Sayfaya Aktarılıyorsunuz");
        setTimeout(() => {
          setIsLoggedIn(true);
          navigate('/home');
        }, 2000)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Giriş Başarısız! Lütfen Kullanıcı Bilgilerinizi Kontrol Edin")
        console.error("Giriş Hatası:", errorCode, errorMessage);
      });
  };

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        toast.success("Giriş yapıldı! Ana Sayfaya Aktarılıyorsunuz");
        setTimeout(() => {
          setIsLoggedIn(true);
          navigate('/home');
        }, 2000)
      })
      .catch((error) => {
        console.error("Error signing in: ", error);
      });
  };

  return (
    <div className='flex w-full h-full justify-center items-center'>
      <div className='lg:w-8/12 h-screen flex justify-center items-center tablet-container'>
        <div className='flex flex-col w-11/12 h-5/6 items-center justify-center p-5 shadow-lg'>
            <div className='flex flex-col gap-1'>
                <motion.img initial={{ opacity: 0, x: 20 }}  animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }} src={Logo} className='logo'/>
                <p className='welcome-text'>Welcome Back!</p>
                <h1 className='sing-text'>Sing Up</h1>

                <label>Email</label>
                <input type='email' className='rounded-md p-1 bg-bg-right' onChange={(e) => {setEmail(e.target.value)}}/>

                <label>Password</label>
                <input type='password' className='rounded-md p-1 bg-bg-right' onChange={(e) => {setPassword(e.target.value)}}/>

                <button onClick={signUpUserWithEmail} type='submit' className='border p-1 rounded-xl mt-3 bg-bg-right'>SING UP</button>
                 <button onClick={handleClick} type='submit' className='flex p-1 justify-center gap-2 items-center border rounded-xl mt-3 '>
                  <FcGoogle className='w-6 h-6'/>
                  Google ile Giriş Yap
                 </button>
                 <p className='flex justify-center items-center account mt-5'>
                  I don’t have an account ? <Link to="/register" className='sign pl-1 bg-blue'>Sign in</Link>
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

export default Login;
