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

   async function getUserCampaigns() {
      const allCampaigns = await getCampaigns();
      const userCampaigns = allCampaigns.filter(
         campaign => campaign.owner === account
      );
      return userCampaigns;
   }

   async function donate(pid, amount) {
      const data = await contract.call(
         'donateToCampaign',
         [pid],
         {value: ethers.utils.parseEther(amount)}
      );
      return data;
   }

   async function getDonations(pid) {
      // getDonators() returns a two-dimensional array, with the first
      // inner array containing the donors and the second containing the
      // corresponding donations
      const data = await contract.call('getDonators', [pid]);
      const [donatorList, donationList] = data;
      const donations = donatorList.map((donator, idx) => ({
         donator: donator,
         donation: ethers.utils.formatEther(donationList[idx].toString())

      }));
      return donations;
   }

   return (
      <web3Context.Provider value={{
         account, walletFrontEndConnect, walletConfig, contract,
         publishCampaign, getCampaigns, getUserCampaigns, donate, getDonations
      }}>
         {children}
      </web3Context.Provider>
   )
}