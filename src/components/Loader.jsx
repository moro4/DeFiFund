import { loader } from '../assets';

export default function Loader() {
   return (
      <div className='fixed inset-0 z-10 w-screen h-screen flex-col
         bg-[rgba(0,0,0,0.7)] flex items-center justify-center'
      >
         <img src={loader} alt='loader' className='w-[100px] h-[100px]
            object-contain'
         />
         <p className='mt-[20px] font-epilogue font-bold text-[20px]
            text-center text-white antialiased opacity-85'
         >
            Transaction in progress...
         </p>
      </div>
   )
}