import React, { useContext, useState } from 'react';
import { Link, Navigate, NavLink } from 'react-router';
import { assets } from '../assets/assets'
import '../components/Navbar.css'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const {showSearch, setShowSearch, getCartCount, setCartItem,token, navigate, setToken} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);

    const logout = () =>{
        
        localStorage.removeItem('token');
        setToken('');   
        navigate('/login');
        setCartItem({});
    }

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            {/* logo  */}
            <div>
                <Link to={'/'}><h1 className='text-2xl'>NOBORUP</h1></Link>
            </div>
            {/* Navigations Links  */}
            <div>
                <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                    <li>
                        <NavLink to='/' className='flex flex-col items-center gap-1'>
                            <p className='uppercase'>Home</p>
                            <hr className='w-1/2 border-none h-0.5 bg-gray-700 hidden' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                            <p className='uppercase'>Collection</p>
                            <hr className='w-1/2 border-none h-0.5 bg-gray-700 hidden' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/about' className='flex flex-col items-center gap-1'>
                            <p className='uppercase'>About</p>
                            <hr className='w-1/2 border-none h-0.5 bg-gray-700 hidden' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact' className='flex flex-col items-center gap-1 '>
                            <p className='uppercase'>Contact</p>
                            <hr className='w-1/2 border-none h-0.5 bg-gray-700 hidden' />
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Profiel and cart div  */}
            <div className='flex items-center gap-6'>
                <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="search" className='w-5 cursor-pointer' />

                <div className='group relative'>
                    <Link to={'/login'}><img src={assets.profile_icon} alt="profile" className='w-5 cursor-pointer' /></Link>
                    <div className='hidden group-hover:block absolute right-0 pt-4 bg-white shadow-md rounded'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={logout} className='cursor-pointer hover:block'>Logout</p>
                        </div>
                    </div>
                </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} alt="cart" className='w-5 ' />
                    <p className='absolute right-0 bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="menu" className='w-5 cursor-pointer sm:hidden' />
            </div>
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
                        <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to="/">HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to="/collection">COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to="/about">ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to="/contact">CONTACT</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;