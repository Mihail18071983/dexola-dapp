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
      {({ openConnectModal, connectModalOpen }) => {
        return (
          <Button
            className={className}
            disabled={isConnecting && connectModalOpen}
            onClick={openConnectModal}
            type="button"
          >
            <span>
              {!isConnecting || !connectModalOpen
                ? "Connect Wallet"
                : "Connecting..."}
            </span>
            {connectModalOpen && <CustomLoader width={32} height={32} />}
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
