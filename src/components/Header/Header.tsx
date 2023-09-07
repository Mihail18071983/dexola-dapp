import React, { FC } from "react";

import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useBalance } from "wagmi";
import { useContractRead } from "wagmi";
import { formatUnits } from "viem/utils";

import styles from "./Header.module.scss";
import containerStyles from "../../Container.module.scss";

import { Logo } from "../../shared/svgComponents/Logo";
import { Button } from "../../shared/Button/Button";

import stakingABI from "../../stakingABI.json";

export const Header: FC = () => {
  const injected = new InjectedConnector();
  const { connector, isConnected, address, isConnecting, isDisconnected } =
    useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const { data, isError } = useBalance({
    address,
    watch: true,
    formatUnits: "ether",
  });

  const { data: contractData } = useContractRead({
    address: "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83",
    abi: stakingABI,
    functionName: "balanceOf",
    args: [address],
  });

  const balance = contractData? formatUnits(contractData as bigint, 18):0;

  console.log("contractBalance", balance);

  return (
    <header className={styles.header}>
      <div className={containerStyles.container}>
        <div className={styles.menuWrapper}>
          <button className={styles.logo}>
            <Logo className={styles.icon} width="34" height="20" />
          </button>
          {!isConnected ? (
            <Button
              onClick={() => {
                console.log("connected");
                connect({ connector: injected });
              }}
              type="button"
            >
              Connect Wallet
            </Button>
          ) : (
              <>
                <p>{ balance} STRU</p>
              <div className={styles.clienInfo}>
                <p>
                  {" "}
                  Balance: {data?.formatted} {data?.symbol}
                </p>
                <p>{address}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
