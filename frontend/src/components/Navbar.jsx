import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setToken('');
    setCartItems({});
  };

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className='w-36' alt=""/></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-570'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 boarder-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 boarder-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 boarder-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 boarder-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

        <div className='group relative'>
          <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
          {/* dropdown menu */}
          {token &&  
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>                                          
            </div>
          </div>}
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
          <p className="absolute top-[-5px] right-[-5px] flex items-center justify-center w-4 h-4 bg-black text-white text-[8px] rounded-full">{getCartCount()}</p>
        </Link>

        {/* Wishlist Icon */}
        <Link to='/wishlist' className='relative'>
          <img src={assets.heart} className='w-5 min-w-5' alt="Wishlist" />
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt=""/>
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
