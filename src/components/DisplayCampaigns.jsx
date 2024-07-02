import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import FundCard from './FundCard';

export default function DisplayCampaigns({ title, isLoading, campaigns }) {

   const navigate = useNavigate();

   function handleNavigate(campaign) {
      navigate(`/campaigns-details/${campaign.title}`, { state: campaign });
   }

   return (
      <div>
         <h1 className='font-epilogue font-semibold text-[18px] text-white
            text-left'
         >
            {title} ({campaigns.length})
         </h1>
         <div className='flex flex-wrap mt-[20px] gap-[26px]'>

            {/* Show when campaings are loading */}
            {isLoading && <img src={loader} alt='loadindicator'
               className='w-[100px] h-[100px] object-contain' />}

            {/* Show when there are no campaigns data*/}
            {!isLoading && campaigns.length === 0 &&
               <p className='font-epilogue font-semibold text-[14px
                  leading-[30px] text-[#818183]'
               >
                  No campaings so far!
               </p>
            }

            {/* Display loaded campaigns */}
            {!isLoading && campaigns.length > 0 &&
               campaigns.map(
                  campaign =>
                     <FundCard key={campaign.pid} {...campaign}
                        handleClick={() => handleNavigate(campaign)}
                     />
               )
            }

         </div>
      </div>
   )
}