import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import { web3Context } from '../context';
import { CustomButton, CountBox } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

export default function CampaignDetails() {

   const { state } = useLocation();
   const { donate, getDonations, contract, account } = useContext(web3Context);

   const [isLoading, setIsLoading] = useState(false);
   const [donationAmount, setDonationAmount] = useState('');
   const [donators, setDonators] = useState([]);

   const remainingDays = daysLeft(state.deadline);
   const barPercent = calculateBarPercentage(
      state.target, state.amountCollected
   );

   useEffect(() => {
      if (contract) {
         (async function () {
            const data = await getDonations(state.pid);
            setDonators(data);
         }())
      }
   }, [contract, account]);

   async function handleDonate() {
      setIsLoading(true);
      try {
         const data = await donate(state.pid, donationAmount);
      } catch (err) {
         console.log(err);
      } finally {
         setIsLoading(false);
      }
   }

   return (
      <div>

         {isLoading && 'Loading...'}

         <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>

            <div className='flex-1 flex-col'>
               <img src={state.image} alt='campaign image'
                  className='w-full h-[410px] object-cover rounded-xl'
               />
               <progress value={barPercent} max='100' className='h-[5px]
                  w-full progress'
               />
            </div>

            <div className='flex md:w-[150px] w-full flex-wrap gap-[30px]'
            >
               <CountBox title='Days Left' value={remainingDays} />
               <CountBox
                  title={`Raised of ${state.target}`}
                  value={state.amountCollected}
               />
               <CountBox title='Total Backers' value={donators.length} />
            </div>

         </div>

         <div className='mt-[60px] flex lg:flex-row flex-col gap-5'>

            <div className='flex flex-col gap-[40px]'>

               <div>

                  <h4 className='font-epilogue font-semibold text-[18px]
                     text-white uppercase pl-0'
                  >
                     Fundraiser — {state.title}
                  </h4>

                  <div className='mt-[20px] flex flex-row items-center
                     flex-wrap gap-[14px]'
                  >

                     <div className='w-[52px] h-[52px] flex items-center
                        justify-center rounded-full bg-[#2c2f32]
                        cursor-pointer'
                     >
                        <img src={thirdweb} alt='user'
                           className='w-[60%] h-[60%] object-contain' />
                     </div>

                     <div>
                        <h4 className='font-epilogue font-semibold text-[14px]
                           text-white break-all'
                        >
                           {state.owner}
                        </h4>
                        <p className='mt-[4px] font-epilogue font-normal
                           text-[12px] text-[#808191]'
                        >
                           {/* Some hardcoded dummy value */}
                           10 Campaigns
                        </p>
                     </div>

                  </div>

               </div>

               <div>

                  <h4 className='font-epilogue font-semibold text-[18px]
                     text-white uppercase'
                  >
                     Story
                  </h4>

                  <div className='mt-[20px]'>
                     <p className='font-epilogue font-normal
                        text-[16px] text-[#808191] leading-[26px]
                        text-justify'
                     >
                        {state.description}
                     </p>
                  </div>

               </div>

               <div>

                  <h4 className='font-epilogue font-semibold text-[18px]
                     text-white uppercase'
                  >
                     Donators
                  </h4>

                  <div className='mt-[20px] flex flex-col gap-4'>

                     {donators.length > 0
                        ? donators.map((donator, idx) => (
                           <div key={`${donator.donator}-${idx}`}
                              className='flex justify-between items-center
                                 gap-4'
                           >
                              <p className='font-epilogue font-normal
                                 text-[16px] text-[#b2b3bd] leading-[26px]
                                 break-all'
                              >
                                 {idx + 1}. {donator.donator}
                              </p>
                              <p className='font-epilogue font-normal
                                 text-[16px] text-[#808191] leading-[26px]
                                 break-all'
                              >
                                 {donator.donation} ETH
                              </p>
                           </div>
                        ))

                        : <p className='font-epilogue font-normal
                           text-[16px] text-[#808191] leading-[26px]
                           text-justify'
                        >
                           No dontators yet. Be the first one!
                        </p>
                     }

                  </div>

               </div>

            </div>

            <div className='min-w-80'>

               <h4 className='font-epilogue font-semibold text-[18px]
               text-white uppercase'
               >
                  Fund
               </h4>

               <div className='mt-[20px] flex flex-col p-4 bg-[#1c1c24]
                  rounded-[10px]'
               >

                  <p className='font-epilogue font-medium text-[20px]
                     leading-[30px] text-center text-[#808191]'
                  >
                     Fund the campaign
                  </p>

                  <div className='mt-[30px]'>

                     <input
                        type="number"
                        placeholder='ETH 0.01'
                        step='0.01'
                        value={donationAmount}
                        onChange={e => setDonationAmount(e.target.value)}
                        className='w-full py-[10px] sm:px-[20px] px-[15px]
                           outline-none border-[1px] border-[#3a3a43]
                           bg-transparent font-epilogue text-white
                           text-[18px] leading-[30px]
                           placeholder:text-[#4b5264] rounded-[10px]'
                     />

                     <div className='my-[20px] p-4 bg-[#13131a]
                        rounded-[10px]'
                     >

                        <h4 className='font-epilogue font-semibold
                           leading-[22px] text-white'
                        >
                           What are you waiting for, back it now!
                        </h4>

                        <p className='mt-[20px] font-epilogue font-normal
                           leading-[22px] text-[#808191]'>
                           Seize this once in a lifetime opportunity by
                           supporting "{state.title}"
                        </p>

                     </div>

                     <CustomButton
                        btnType='button'
                        title='Fund Campaign'
                        handleClick={handleDonate}
                        styles='w-full bg-[#8c6dfd]'
                     />

                  </div>

               </div>

            </div>

         </div>

      </div>
   )
}