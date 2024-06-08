import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from './';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';

export default function Navbar() {

   const navigate = useNavigate();
   const [reference, setReference] = useState('dashboard');
   const [toggleDrawer, setToggleDrawer] = useState(false);
   const ethereum_address = '0xabc';

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
               title={ethereum_address ? 'Create Campaing' : 'Connect'}
               styles={ethereum_address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
               handleClick={() => {
                  if (ethereum_address) {
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

      </div>
   )
}