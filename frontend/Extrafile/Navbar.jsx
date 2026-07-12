import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FiZap, FiGlobe } from 'react-icons/fi'
import { FaBars, FaSearch, FaSun } from 'react-icons/fa'
import { MdFavoriteBorder } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { RiShoppingBag3Line } from 'react-icons/ri'
import { ThemeContext } from './src/context/ThemeContext';
import { ProductContext } from './src/context/ProductContext';
import { IoIosMoon, IoIosSunny } from 'react-icons/io';

const Navbar = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);

  const { products, searchQuery, setSearchOuery } = useContext(ProductContext);

  console.log(products, searchQuery, 'pro');
  
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [IsSearchBar, setIsSearchBar] = useState(false);

  const menuItems = [
    { path: '/', label: 'Home', },
    { path: '/shop', label: 'Shop', },
    { path: '/admin-dashboard', label: 'Admin', },
  ];


  const filteredProducts = searchQuery.trim() !== ''
    ? products.filter((product) => {
      const name = product.name.toLowerCase();
      const category = product.category.toLowerCase();
      const search = searchQuery.toLowerCase();

      const isMatchSearchQuery = name.includes(search) || category.includes(search);
      
        return isMatchSearchQuery;
    }) : [];

  return (
    <nav className=' bg-white text-black dark:bg-black dark:text-white px-3 py-2 transition-all duration-200'>


      <div className=' flex justify-between items-center'>
        {/* logo design */}
        <div className='flex items-center gap-2'>
          <div className='w-10 h-10 bg-black dark:bg-[#C5A059] text-white dark:text-black flex justify-center items-center text-xl font-black tracking-tighter rounded-xl hover:text-blue-300 hover:bg-slate-800  transition-all duration-200 '>
            <span>GZ</span>
          </div>
          <div className='flex flex-col items-start leading-none'>
            <span className='text-black dark:text-white text-xl font-black tracking-wide'>GEN-Z</span>
            <span className='text-[10px] text-cyan-600 dark:text-[#C5A059] font-bold tracking-[0.25em] uppercase'>Export</span>
          </div>
        </div>

        {/* dackstop menu */}
        <div className=''>
          <ul className='hidden md:flex gap-3'>
            {
              menuItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.path}>
                    <Link to={item.path}
                      className={`font-bold tracking-wide ${isActive ? "text-blue-600 dark:text-blue-600 underline" : ""}`}>
                      {item.label}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className='hidden md:flex items-center gap-3'>
          <button>{theme ? <IoIosMoon onClick={toggleTheme} size={20} /> : <IoIosSunny onClick={toggleTheme} size={20} />}</button>
          <button onClick={() => setIsSearchBar(!IsSearchBar)}><FaSearch size={20} /></button>
          <button><MdFavoriteBorder size={20} /></button>
          <button><RiShoppingBag3Line size={20} /></button>
          <button className='font-black border border-cyan-600 px-3 py-1 rounded-xl transition-all duration-200 hover:border-slate-400 hover:text-cyan-600'>Login</button>
          <button className='bg-cyan-600 text-white dark:text-black font-black px-3 py-1 rounded-xl transition-all duration-200 hover:bg-cyan-400'>Register</button>
        </div>

        <div className='flex items-center gap-3 md:hidden'>
          <button>{theme ? <IoIosMoon onClick={toggleTheme} size={20} /> : <IoIosSunny onClick={toggleTheme} size={20} />}</button>
          <button onClick={() => setIsSearchBar(!IsSearchBar)}><FaSearch size={20} /></button>
          <button><MdFavoriteBorder size={20} /></button>
          <button><RiShoppingBag3Line size={20} /></button>
          <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <RxCross2 size={20} /> : <FaBars size={20} />}</button>
        </div>

      </div>


      {/* products filler */}
      {
        IsSearchBar && <div className=' flex flex-col justify-center items-center'>

          <div className='flex items-center  border w-64 rounded-xl relative mt-4 hover:ring-2 ring-blue-700 hover:border-none transition-all duration-200 overflow-hidden'>
            <input type="text" value={searchQuery} onChange={(e) => setSearchOuery(e.target.value)} className='px-3 py-1 outline-0 placeholder:text-black dark:placeholder:text-white' placeholder='Search Products...' />
          </div>

          <div className='p-2'>
            {
              filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (<div key={product._id} className='border border-amber-500 m-5 p-5'>
                  <h2>{product.title}</h2>
                  <p>{product.price}</p>
                  <p>{product.description}</p>
                  <button>Add to Cart</button>
                </div>))
              ) : (
                <p className='text-red-600 mt-2'>
                  products not found !
                </p>)
            }

          </div>
        </div>
      }


      {/* mobile menu */}
      <div className={`pt-2 mt-2 border-t transition duration-200${isOpen ? " max-h-72 opacity-100 " : " opacity-0 max-h-0"}`}>
        <ul className='flex flex-col gap-1 md:hidden'>
          {
            menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}
                    className={`text-white px-3 py-1 block font-bold tracking-wide rounded-xl transition-all duration-200 ${isActive ? "bg-blue-600 underline" : "bg-slate-600 hover:bg-slate-800"}`}>
                    {item.label}
                  </Link>
                </li>
              )
            })
          }
        </ul>
        <div className='flex justify-center items-center gap-5 mt-5'>
          <button className='font-black border border-cyan-600 px-3 py-1 rounded-xl transition-all duration-200 hover:border-slate-400 hover:text-cyan-600'>Login</button>
          <button className='bg-cyan-600 text-white dark:text-black font-black px-3 py-1 rounded-xl transition-all duration-200 hover:bg-cyan-400'>Register</button>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;



