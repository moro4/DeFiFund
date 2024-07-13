import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage, isFormComplete } from '../utils';
import { web3Context } from '../context';

export default function CreateCampaign() {

   const navigate = useNavigate();
   const { publishCampaign } = useContext(web3Context);
   const [isLoading, setIsLoading] = useState(false);
   const [form, setForm] = useState({
      name: '', title: '', description: '', target: '', deadline: '', image: ''
   });

   function handleFormFieldChange(e, targetField) {
      setForm({ ...form, [targetField]: e.target.value });
   }

   async function handleSubmit(e) {
      e.preventDefault();

      checkIfImage(form.image, async imgExists => {
         if (imgExists) {
            if (isFormComplete(form)) {
               setIsLoading(true);
               await publishCampaign(
                  { ...form, target: ethers.utils.parseUnits(form.target, 18) }
               )
               setIsLoading(false);
               navigate('/');
            } else {
               alert('Please fill out the form completely.');
            }
         } else {
            alert('Please provide a valid image URL.');
            setForm({ ...form, image: ''});
         }
      })
   }

   return (
      <div className='bg-[#1c1c24] flex flex-col justify-center items-center
         rounded-[10px] sm:p-10 p-4'
      >

         {isLoading && <Loader />}

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
                  handleChange={(e) => { handleFormFieldChange(e, 'name') }}
               />
               <FormField
                  labelName='Campaign Title *'
                  placeholder='Provide a Title'
                  inputType='text'
                  value={form.title}
                  handleChange={(e) => { handleFormFieldChange(e, 'title') }}
               />
            </div>

            <FormField
               labelName='Story *'
               placeholder='Share your strory'
               isTextArea
               value={form.description}
               handleChange={
                  (e) => { handleFormFieldChange(e, 'description') }
               }
            />

            {/* Information banner */}
            <div className='w-full h-[120px] flex justify-center items-center
               p-4 bg-[#8c6dfb] rounded-[10px]'
            >
               <img src={money} alt='money icon'
                  className='w-[40px] h-[40px] object-contain'
               />
               <h4 className='font-epilogue font-bold text-[25px] text-white
                  ml-[20px] antialiased'
               >
                  Get 100% of the raised amount!
               </h4>
            </div>

            <div className='flex flex-wrap gap-[40px]'>
               <FormField
                  labelName='Goal *'
                  placeholder='ETH 0.50'
                  inputType='text'
                  value={form.target}
                  handleChange={(e) => { handleFormFieldChange(e, 'target') }}
               />
               <FormField
                  labelName='End Date *'
                  placeholder='End Date'
                  inputType='date'
                  value={form.deadline}
                  handleChange={
                     (e) => { handleFormFieldChange(e, 'deadline') }
                  }
               />
            </div>

            <FormField
               labelName='Campaign image *'
               placeholder='Place image URL of your campaign'
               inputType='url'
               value={form.image}
               handleChange={
                  (e) => { handleFormFieldChange(e, 'image') }
               }
            />

            <div className='flex justify-center items-center mt-[40px]'>
               <CustomButton btnType='submit' title='Submit new campaign'
                  styles='bg-[#1dc071]'
               />
            </div>

         </form>

      </div>
   )
}