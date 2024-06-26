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

   return (
      <web3Context.Provider value={{
         account, walletFrontEndConnect, walletConfig, contract, publishCampaign
      }}>
         {children}
      </web3Context.Provider>
   )
}