import { configureChains, createConfig } from "wagmi";
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import {sepolia } from 'wagmi/chains'

import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

// import { InjectedConnector } from "wagmi/connectors/injected";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const { chains, publicClient } = configureChains(
  [sepolia],
  [
    infuraProvider({ apiKey: import.meta.env.VITE_CONFIG_IFURA_API_KEY }),
    publicProvider(),
  ]
);

const {connectors } = getDefaultWallets({
  appName: "dexola-dapp", 
  chains,
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  // connectors: [
  //   new MetaMaskConnector({ chains }),
  //   new CoinbaseWalletConnector({
  //     chains,
  //     options: {
  //       appName: "wagmi",
  //     },
  //   }),
  //   new WalletConnectConnector({
  //     chains,
  //     options: {
  //       projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  //     },
  //   }),
  //   new InjectedConnector({
  //     chains,
  //     options: {
  //       name: "Injected",
  //       shimDisconnect: true,
  //     },
  //   }),
  // ],
  publicClient,
});

export { chains }