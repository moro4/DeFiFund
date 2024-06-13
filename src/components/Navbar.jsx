import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from './';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';

export default function Navbar() {

   const navigate = useNavigate();
   const [reference, setReference] = useState('dashboard');
   const [toggleDrawer, setToggleDrawer] = useState(false);
   const ethereum_addr = '0xabc';

   return (
      <div className='flex md:flex-row flex-col-reverse justify-between
         mb-[35px] gap-6'
      >
         {/* Searchbar */}
         <div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2
            h-[52px] bg-[#1c1c24] rounded-[100px]'
         >

            {/* Search Text Field */}
            <input type="text" placeholder='Search for campaign'
               className='w-full font-epilogue font-normal text-[14px]
               placeholder:text-[#4b5264] text-white bg-transparent
               outline-none'
            />

            {/* Search Button */}
            <div className='w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex
               justify-center items-center cursor-pointer'
            >
               <img src={search} alt='search button'
                  className='w-[15px] h-[15px] object-contain'
               />
            </div>

         </div>

         <div className='sm:flex hidden flex-row justify-end gap-4'>

            <CustomButton
               btnType='button'
               title={ethereum_addr ? 'Create Campaing' : 'Connect'}
               styles={ethereum_addr ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
               handleClick={() => {
                  if (ethereum_addr) {
                     navigate('create-campaing');
                  } else {
                     // connect();
                  }
               }}
            />

            <Link to='/profile'>
               <div className='w-[52px] h-[52px] rounded-full
                     bg-[#2c2f32] flex justify-center items-center
                     cursor-pointer'
               >
                  <img
                     src={thirdweb}
                     className='w-[60%] h-[60%] object-contain'
                     alt='user profile icon'
                  />
               </div>
            </Link>

         </div>

         {/* Mobile navigation */}
         <div className='sm:hidden flex justify-between items-center relative'>

            {/* Profile icon */}
            <div className='w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32]
               flex justify-center items-center cursor-pointer'
               >
               <img
                  src={thirdweb}
                  className='w-[60%] h-[60%] object-contain'
                  alt='user profile icon'
                  />
            </div>

            {/* Hamburger menu icon */}
            <img
               src={menu}
               alt='menu'
               className='w-[34px] h-[34px] object-contain cursor-pointer'
               onClick={() => setToggleDrawer(!toggleDrawer)}
            />

            {/* Navlinks Drawer */}
            <div className={`
               absolute top-[60px] right-0 left-0 bg-[#1c1c24]
               z-10 shadow-secondary py-4 transition-all duration-500
               ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'}`}
            >
               <ul className='mb-4'>
                  {navlinks.map(link => (
                     <li
                        key={link.name}
                        className={`
                           flex p-8
                           ${reference === link.name && 'bg-[#3a3a43]'}
                        `}
                        onClick={() => {
                           setReference(link.name);
                           setToggleDrawer(false);
                           navigate(link.link);
                        }}
                     >
                        <img
                           src={link.imgUrl}
                           alt={link.name}
                           className={`
                              w-[24px] h-[24px] object-contain
                              ${reference === link.name
                                 ? 'grayscale-0'
                                 : 'grayscale'
                              }
                           `}
                        />
                        <p className={`
                           ml-[20px] font-epilogue font-semibold text-[14px]
                           cursor-pointer
                           ${reference === link.name
                              ? 'text-[#1dc071]'
                              : 'text-[#808191]'}
                           `}
                        >
                           {link.name}
                        </p>
                     </li>
                  ))}
               </ul>

               {/* Create campaign/Connect button */}
               <div className='flex mx-4'>
                  <CustomButton
                     btnType='button'
                     title={ethereum_addr ? 'Create Campaing' : 'Connect'}
                     styles={ethereum_addr ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                     handleClick={() => {
                        if (ethereum_addr) {
                           navigate('create-campaing');
                        } else {
                           // connect();
                        }
                     }}
                  />
               </div>

            </div>

         </div>

      </div>
   )
}