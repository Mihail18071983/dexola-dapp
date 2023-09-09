import { InjectedConnector } from "wagmi/connectors/injected";
import { Connector } from "wagmi";

interface IConfig {
  connector?: Connector;
}

interface IConnect {
  connect: (config:IConfig) => void;
  error?: Error | null;
  isConnected: boolean;
}

export const connectWallet = ({ connect, error, isConnected }: IConnect) => {
  const injected = new InjectedConnector();
  connect({ connector: injected });
  error
    ? console.log(error.message)
    : isConnected
    ? console.log("connected")
    : console.log(
        "Already processing eth_requestAccounts. Check metamask extension"
      );
};
