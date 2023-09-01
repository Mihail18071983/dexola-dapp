import { ethers } from "ethers";

declare module "ethers" {
  interface Ethers extends ethers {
    providers: {
      Web3Provider: Web3Provider;
    };
  }

  class Web3Provider {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(provider:any) 
    // Properties
    isMetaMask: boolean;
    isEIP1193: boolean;
    chainId: number;

    // Methods
    send(method: string, params?: unknown[]): Promise<unknown>;
    getSigner(address?: string): JsonRpcSigner;
    listAccounts(): Promise<string[]>;
    request(args: { method: string; params?: unknown[] }): Promise<unknown>;

    on(eventName: string, callback: () => void): void;
    off(eventName: string, callback: () => void): void;

    detectNetwork(): Promise<Network>;
    getNetwork(): Promise<Network>;
  }

  export {Ethers, Web3Provider}
}
