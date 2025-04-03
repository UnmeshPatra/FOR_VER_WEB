import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {search,setSearch,showSearch,setShowSearch} = useContext(ShopContext);
    const [visible,setVisible] =useState(false);
    const location = useLocation();
    
    useEffect(()=>{
        if(location.pathname.includes('collection') && showSearch){
            setVisible(true);

        }else{
            setVisible(false)
        }
    },[location, showSearch])

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>

        <div className="w-[450px] inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-8 rounded-full ">
            <input value={search} onChange={(e)=>setSearch(e.target.value)}  className=" flex-1 outline-none bg-inherit text-sm" placeholder="Search for products..." ></input>
            <img  src={assets.search_icon} alt="" className='w-4' />
        </div>
        <img src={assets.cross_icon} alt="" className="w-4 h-4 ml-3 inline  cursor-pointer" onClick={() => setShowSearch(false)}/>
      
    </div>
  ) : null
} 

export default SearchBar


