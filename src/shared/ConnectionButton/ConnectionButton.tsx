import React from "react";
import '@rainbow-me/rainbowkit/styles.css'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../Button/Button";
import { useAccount } from "wagmi";
import { Oval } from "react-loader-spinner";

interface IProps {
className?: string;
}

export const ConnectionButton = ({className}:IProps) => {
  const { isConnecting } = useAccount();
  return (
    <ConnectButton.Custom>
      {({ openConnectModal }) => {
        return (
          <Button className={className}
            disabled={isConnecting}
            onClick={openConnectModal}
            type="button"
          >
            {isConnecting ? (
              <Oval
                ariaLabel="loading-indicator"
                height={32}
                width={32}
                strokeWidth={2}
                strokeWidthSecondary={1}
                color="blue"
                secondaryColor="white"
              />
            ) : (
              <span>Connect Wallet</span>
            )}
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
