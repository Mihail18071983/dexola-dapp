import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Connector } from "wagmi";

interface IConfig {
  connector?: Connector;
}

interface IConnect {
  connect: (config: IConfig) => void;
  error?: Error | null;
}

export const connectWallet = ({ connect, error }: IConnect) => {
  const isMobile = window.innerWidth < 744;
  const injected = new InjectedConnector({
    options: {
      shimDisconnect: true,
    },
  });
  const walletConnect = new WalletConnectConnector({
    options: {
      projectId: "c8e6e578374eaddc435311cb4472a14d",
    },
  });
  isMobile
    ? connect({ connector: walletConnect })
    : connect({ connector: injected });
  error && console.log(error.message);
};
