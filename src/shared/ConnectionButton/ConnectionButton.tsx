import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../Button/Button";
import { useAccount } from "wagmi";
import { CustomLoader } from "../CustomLoader/CustomLoader";

interface IProps {
  className?: string;
}

export const ConnectionButton = ({ className }: IProps) => {
  const { isConnecting } = useAccount();
  return (
    <ConnectButton.Custom>
      {({ openConnectModal }) => {
        return (
          <Button
            className={className}
            disabled={isConnecting}
            onClick={openConnectModal}
            type="button"
          >
            <span>{!isConnecting ? "Connect Wallet" : "Connecting..."}</span>
            {isConnecting && <CustomLoader width={32} height={32} />}
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
