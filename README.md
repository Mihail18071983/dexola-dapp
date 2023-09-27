# dexola-dapp

This is a application which allows users to interact with smart contract.
The application has responsive design and could be displayed appropriately from window device width 375px to 1920px.

## Getting started

For launching application  you just need moving to the https://dexola-dapp.vercel.app/

# For launching application on mobile device from metamask browser directly you need moving to the https://metamask.app.link/dapp/dexola-dapp.vercel.app/ 


## Installation

Before installation be sure that you have Node.js at least 16v installed.
You can check it running command node -v in terminal.
Clone this repository to your local machine:

git clone https://github.com/Mihail18071983/dexola-dapp

Navigate to the project directory:

- cd dexola_dapp

Install the project dependencies:

- npm install


## Usage

After launching you could see start window 
### <img width="200" src="/public/start-window.png" alt="start window">
For implementation operations with smart contract you need to connect your wallet by pressing button "Connect wallet" which located in the header and main parts of page.
After pressing "Connect wallet" the modal window with way of pluging should be shown.
### <img width="200" src="/public/plug-window.png" alt="connect wallet window">
There are several different ways to connect wallet to the application is represented.
The most popular way is connecting from metamask. To connect from metamask you need to follow instructions bellow.
If you have already had metamask extantion in browser you just simply need to press metamask icon in dialog window and following next ways as entering password in opening metamask window ets...

If you don't have metamask extention in your browser. You can set it up in advance or pressing by metamask icon in dialog window setting it using qr code or pressing get in dialog window
### <img width="200" src="/public/dialog-window.png" alt="dialog window metamask connecting">

After successfull entering in application you can provide main operations with smart contract.

- staking: adding some starrunning tokens from your wallet balance to contract. Staked balance is displayed amount of token in your contract.
For making stake operation you need to have enough token in your wallet balance. This information is displayed in header next to your address
### <img width="200" src="/public/userinfo.png" alt="user information">
Also information about available tokens is located below the input for entering amount.

- withdwrawing: from staling balance in contract and returning to the user wallet. You can't withdraw tokens more then available.
Amount of available tokens is displayed below the input of entering amout.
### <img width="200" src="/public/display-amount.png" alt="amount of tokens available on contract">

- claim rewards: you can withdraw rewards (amount of token) from contract to your wallet. 

Also values in header equipped by promt. You can display promt for every value when question mark is shown. 
Depends on device width it will be hoisted promts (on desktop) or modal widows (tablets and mobile).

To close modal window this promt you need to touch by backdrop window (not by message)
### <img width="200" src="/public/promt.png" alt="window with promt">


## Technologies

The web application was designed using the following technologies:

1. As a core is used vite rect typescript boilerplate.
2. For styling - sass modules.
3. For operation with smart contract -wagmi
4. For connecting wallet -rainbowkit
5. For rendering complicated content on different type of devices is used pattern which named render by condition.
6. For form building -react-hook-form.





