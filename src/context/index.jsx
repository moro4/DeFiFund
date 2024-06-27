import { createContext } from 'react';
import { useAddress, useConnect, metamaskWallet, useContract, useContractWrite } from
   '@thirdweb-dev/react';
import { ethers } from 'ethers';

export const web3Context = createContext();

export function Web3ContextProvider({ children }) {

   const { contract } = useContract(
      '0x03df165dbD23bee9Dc777d8dF04F90a4214fb19F'
   );

   const { mutateAsync: createCampaign } = useContractWrite(
      contract, 'createCampaign'
   );

   const account = useAddress();

   const walletConfig = metamaskWallet();
   const walletFrontEndConnect = useConnect();

   async function publishCampaign(form) {
      try {
         await createCampaign({ args: [
            account, form.title, form.description, form.target,
            new Date(form.deadline).getTime(), form.image
         ]});

         console.log('Contract call success!');

      } catch (error) {
         console.log('Contract call failure!', error);
      }
   }

   async function getCampaigns() {
      const campaigns = await contract.call('getCampaigns');

      const prepCampaigns = campaigns.map((campaign, idx) => ({
         owner: campaign.owner,
         title: campaign.title,
         description: campaign.description,
         target: ethers.utils.formatEther(campaign.target.toString()),
         deadline: campaign.deadline.toNumber(),
         amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
         ),
         image: campaign.image,
         pid: idx
      }));

      return prepCampaigns
   }

   return (
      <web3Context.Provider value={{
         account, walletFrontEndConnect, walletConfig, contract,
         publishCampaign, getCampaigns
      }}>
         {children}
      </web3Context.Provider>
   )
}