import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {logo, sun} from '../assets';
import {navlinks} from '../constants';

function Icon({styles, name, imgUrl, reference, disabled, handleClick}) {

   const activeIconStyle = reference && reference === name && 'bg-[#2c2f32]';
   const unglowStyle = reference !== name && 'grayscale';
   const cursorStyle = !disabled && 'cursor-pointer';

   return (
      <div className={`flex justify-center items-center w-[48px] h-[48px]
         rounded-[10px] ${activeIconStyle} ${cursorStyle} ${styles}`}
         onClick={handleClick}
      >
         <img src={imgUrl} alt='fund logo'
            className={`w-1/2 h-1/2 ${unglowStyle}`}
         />
      </div>
   )
}

export default function Sidebar() {

   const navigate = useNavigate();
   const [reference, setReference] = useState('dashboard');

   return (
      <div className='flex justify-between items-center flex-col sticky top-5
         h-[93vh]'
      >
         {/* Logo */}
         <Link to='/'>
            <Icon styles='w-[52px] h-[52px] bg-[#2c2f32]' imgUrl={logo}/>
         </Link>

         {/* Navigation Sidebar */}
         <div className='flex flex-1 flex-col justify-between items-center
            bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12'
         >
            <div className='flex flex-col justify-center items-center gap-3'>
               {navlinks.map(link => (
                  <Icon
                     key={link.name}
                     {...link}
                     reference={reference}
                     handleClick={() => {
                        if (!link.disabled) {
                           setReference(link.name);
                           navigate(link.link);
                        }
                     }}
                  />
               ))}
            </div>

            <Icon styles='bg-[#1c1c24] shadow-secondary' imgUrl={sun} />

         </div>
      </div>
   )
}