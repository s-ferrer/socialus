import React, { useEffect, useRef, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components';
import Pins from './Pins';
import { userQuery } from '../utils/data';
import { client } from '../client';
import logo from '../assets/logo.png';
const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = null;

  const userInfo =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>

      <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
        <HiMenu
          fontSize={40}
          classname='cursor-pointer'
          onClick={() => setToggleSidebar(false)}
        />
        <Link to='/'>
          <img src={logo} alt='logo' classname='w-28' />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt='logo' classname='w-28' />
        </Link>
      </div>
    </div>
  );
};

export default Home;
