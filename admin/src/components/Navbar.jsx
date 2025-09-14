import React from 'react';
import logo from '../assets/logo.png'

const Navbar = ({setToken}) => {
    return (
        <div className='flex items-center justify-between py-2 px-[4%]'>
            <img className="w-[80px] min-w-[10%]" src={logo} alt="" />
            <button onClick={()=> setToken('')} className='bg-gray-600 cursor-pointer text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    );
};

export default Navbar;