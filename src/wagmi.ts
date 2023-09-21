import { configureChains, createConfig } from "wagmi";
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import {sepolia } from 'wagmi/chains'

import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";


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
  publicClient,
});

export { chains }