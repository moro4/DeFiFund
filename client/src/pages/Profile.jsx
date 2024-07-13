import { useState, useEffect, useContext } from 'react';
import { web3Context } from '../context';
import { DisplayCampaigns } from '../components';

export default function Profile() {

   const [isLoading, setIsLoading] = useState(false);
   const [campaigns, setCampaigns] = useState([]);

   const { account, contract, getUserCampaigns } = useContext(web3Context);

   useEffect(() => {
      if (contract) {
         (async function () {
            setIsLoading(true);
            const data = await getUserCampaigns();
            setCampaigns(data);
            setIsLoading(false);
         })();
      }
   }, [account, contract]);

   return (
      <DisplayCampaigns
         title='All Campaigns'
         isLoading={isLoading}
         campaigns={campaigns}
      />
   )
}