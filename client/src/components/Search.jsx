import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router';

const Search = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const location = useLocation();
    const [searchBarVisible, setSearchBarVisible] = useState(false);

    // SearchBar Only show in Collection Page 
    useEffect(() =>{
        if(location.pathname.includes('collection')){
            setSearchBarVisible(true);
        }else{
            setSearchBarVisible(false);
        }
    }, [location])

    return showSearch && searchBarVisible? (
        <div className='border-t text-center'> 
            <div className='inline-flex items-center bg-gray-50 text-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input value={search} onChange={(e)=> setSearch(e.target.value)} type="text" className='flex-1 outline-none bg-inherit text-sm' placeholder='search' name="" id="" />
                <img className='w-4' src={assets.search_icon} alt="" />
            </div>
            <img onClick={()=> setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
        </div>
    ): null;
};

export default Search;