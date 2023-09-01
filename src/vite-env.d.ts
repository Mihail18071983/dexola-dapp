/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import 'ethers.d.ts';

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}