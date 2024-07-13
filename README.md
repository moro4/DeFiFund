# DeFiFund

![](defifund.avif)

DeFiFund is a simple, albeit incomplete!, react based webapp that empowers crowdfunding through blockchain. It moves away from traditional means like Kickstarter and Co. by leveraging the power of ethereum technology. As a decentralized place DeFiFund allows fundraisers to find unmediated financial support from the community free from any needless authority potentially censoring the process. A simple smart contract coded up with Solidity makes this possible. To raise funds for a campaign one has to complete a form that includes the title, story, financial goal etc. After successful submission the data is stored in the contract, retrieved by the frontend, and displayed on the overview page along with other campaigns ready to be funded. Anyone who believes in the project can directly support it without leaving the app by sending Ether to the contract from which it's then deposited into the fundraiser's ethereum address. Regarding the tech stack, DeFiFund's front-facing part is built with pure react along with tailwindcss, a react router handles the browser navigation and Thirdweb libraries are used to interact with the smart contract. As mentioned above, the app is lacking and by no means production ready. It acts as a proof of concept, so features like search, log in, theme switching, and many other things haven't been built. For me the focal point was more on understanding how the user interface works together with ethereum network in the background.



[DeFiFund LIVE Demo](https://defifund.netlify.app/)