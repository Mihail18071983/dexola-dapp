import {
  starRunnerTokenContractConfig,
  starRunnerStakingContractConfig,
} from "../shared/utils/contracts";
import { useAccount, useBalance, useContractRead } from "wagmi";

export const usePeriodFinish = () => {
  const { data, isSuccess } = useContractRead({
    ...starRunnerStakingContractConfig,
    functionName: "periodFinish",
    watch: true,
  });
  return { data, isSuccess };
};

export const useRewardRate = () => {
  const { data, isSuccess } = useContractRead({
    ...starRunnerStakingContractConfig,
    functionName: "rewardRate",
    watch: true,
  });
  return { data, isSuccess };
};

export const useTotalStake = () => {
  const { data, isSuccess } = useContractRead({
    ...starRunnerStakingContractConfig,
    functionName: "totalSupply",
    watch: true,
  });
  return { data, isSuccess };
};

export const useStakedBalance = () => {
  const { address } = useAccount();
  const { data, isSuccess } = useContractRead({
    ...starRunnerStakingContractConfig,
    functionName: "balanceOf",
    args: [address!],
    watch: true,
  });

  return { data, isSuccess };
};

export const useReward = () => {
  const { address } = useAccount();
  const { data, isSuccess } = useContractRead({
    ...starRunnerStakingContractConfig,
    functionName: "earned",
    args: [address!],
    watch: true,
  });
  return { data, isSuccess };
};

export const useRewardForPeriod = () => {
  const { data, isSuccess } = useContractRead({
    ...starRunnerStakingContractConfig,
    functionName: "getRewardForDuration",
    watch: true,
  });
  return { data, isSuccess };
};

export const useUserBalance = () => {
  const { address } = useAccount();
  const { data, refetch, isSuccess } = useContractRead({
    ...starRunnerTokenContractConfig,
    functionName: "balanceOf",
    args: [address!],
    watch: true,
  });
  return { data, refetch, isSuccess };
};

export const useUserEther = () => {
  const { address } = useAccount();
  const { data, isSuccess } = useBalance({
    address,
    watch: true,
  });
  return { data, isSuccess };
};
