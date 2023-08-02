import React from 'react';
import { BiLogIn, BiSolidRegistered, BiSolidHome } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { BsBasketFill } from 'react-icons/bs';

const NavBar = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate('/login');
  };
  const navigateToHome = () => {
    navigate('/home');
  };
  const navigateToRegister = () => {
    navigate('/register');
  };
  const navigateToProfile = () => {
    navigate('/profile');
  };
  const navigateToBasket = () => {
    navigate('/sepet');
  };

  return (
    <div className=' top-0'>
      <ul className='flex flex-row w-screen justify-around items-center p-2'>
        <li className='flex flex-col items-center'>
          <BiLogIn onClick={navigateToLogin} className='w-10 h-10 cursor-pointer' />
          <label>Log In</label>
        </li>
        <li className='flex flex-col items-center'>
          <BiSolidRegistered onClick={navigateToRegister} className='w-10 h-10 cursor-pointer' />
          <label>Register</label>
        </li>
        <li className='flex flex-col items-center'>
          <BiSolidHome onClick={navigateToHome} className='w-10 h-10 cursor-pointer' />
          <label>Home</label>
        </li>
        <li className='flex flex-col items-center'>
          <CgProfile onClick={navigateToProfile} className='w-10 h-10 cursor-pointer' />
          <label>Profile</label>
        </li>
        <li className='flex flex-col items-center'>
          <BsBasketFill onClick={navigateToBasket} className='w-10 h-10 cursor-pointer' />
          <label>Sepet</label>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
