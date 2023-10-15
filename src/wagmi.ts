import { configureChains, createConfig, mainnet } from "wagmi";
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'
import { WALLET_CONNECT_PROJECT_ID, IFURA_API_KEY } from "./Project_constants";

import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, mainnet],
  [
    infuraProvider({ apiKey: IFURA_API_KEY }),
    publicProvider(),
  ]
);

const {connectors } = getDefaultWallets({
  appName: "dexola-dapp", 
  chains,
  projectId: WALLET_CONNECT_PROJECT_ID,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
});

export { chains }