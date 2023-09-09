import stakingABI from "../stakingABI.json";
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const CONTRACT_ERC_TOKEN = import.meta.env.VITE_CONTRACT_ERC_TOKEN;
import { useAccount, useBalance, useContractRead } from "wagmi";

export const usePeriodFinish = () => {
  const { isConnected } = useAccount();
  const { data } = useContractRead({
    address: isConnected ? CONTRACT_ADDRESS : 0,
    abi: stakingABI,
    functionName: "periodFinish",
  });
  return { data };
};

export const useRewardRate = () => {
  const { isConnected } = useAccount();
  const { data } = useContractRead({
    address: isConnected ? CONTRACT_ADDRESS : 0,
    abi: stakingABI,
    functionName: "rewardRate",
  });
  return { data };
};

export const useTotalStake = () => {
  const { isConnected } = useAccount();
  const { data } = useContractRead({
    address: isConnected ? CONTRACT_ADDRESS : 0,
    abi: stakingABI,
    functionName: "totalSupply",
  });
  return { data };
};

export const useStakedBalance = () => {
  const { isConnected, address } = useAccount();
  const { data } = useContractRead({
    address: isConnected ? CONTRACT_ADDRESS : 0,
    abi: stakingABI,
    functionName: "balanceOf",
    args: [address],
  });

  return { data };
};

export const useReward = () => {
  const { isConnected, address } = useAccount();
  const { data } = useContractRead({
    address: isConnected ? CONTRACT_ADDRESS : 0,
    abi: stakingABI,
    functionName: "earned",
    args: [address],
  });
  return { data };
};

export const useRewardForPeriod = () => {
  const { isConnected } = useAccount();
  const { data } = useContractRead({
    address: isConnected ? CONTRACT_ADDRESS : 0,
    abi: stakingABI,
    functionName: "getRewardForDuration",
  });
  return { data };
};

export const useUserBalance = () => {
  const {address}=useAccount();
  const { data } = useBalance({
    address,
    token: CONTRACT_ERC_TOKEN,
    formatUnits: "ether",
  });
  return { data };
};

export const useUserEther = () => {
  const {address}=useAccount();
   const { data } = useBalance({
    address,
    watch: true,
    formatUnits: "ether",
  });
  return { data };
};