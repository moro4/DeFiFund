import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { money } from '../assets';
import { CustomButton, FormField } from '../components';
import { checkIfImage } from '../utils';

export default function CreateCampaign() {

   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const [form, setForm] = useState({
      name: '', title: '', description: '', target: '', deadline: '', image: ''
   });

   function handleSubmit() {
      return null;
   }

   return (
      <div className='bg-[#1c1c24] flex flex-col justify-center items-center
         rounded-[10px] sm:p-10 p-4'
      >

         {isLoading && 'Loading...'}

         <div className='flex justify-center items-center p-[16px]
            sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'
         >
            <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px]
               leading-[38px] text-white'
            >
               Start a Campaign
            </h1>
         </div>

         <form onSubmit={handleSubmit} className='w-full mt-[65px] flex
            flex-col gap-[30px]'
         >
            <div className='flex flex-wrap gap-[40px]'>
               <FormField
                  labelName='Your Name *'
                  placeholder='John Smith'
                  inputType='text'
                  value={form.name}
                  handleChange={() => {}}
               />
               <FormField
                  labelName='Campaign Title *'
                  placeholder='Provide a Title'
                  inputType='text'
                  value={form.title}
                  handleChange={() => {}}
               />
            </div>
         </form>

      </div>
   )
}