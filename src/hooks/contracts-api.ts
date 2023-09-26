import {
  starRunnerTokenContractConfig,
  starRunnerStakingContractConfig,
} from "../shared/utils/contracts";

import { ErrorMsg } from "../shared/Notification/errorMsg";

import {
  useAccount,
  useBalance,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";

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
  const { address: userWalletAddress } = useAccount();
  const { data, isSuccess } = useContractRead({
    ...starRunnerStakingContractConfig,
    functionName: "balanceOf",
    args: [userWalletAddress!],
    watch: true,
  });

  return { data, isSuccess };
};

export const useReward = () => {
  const { address: userWalletAddress } = useAccount();
  const { data, isSuccess } = useContractRead({
    ...starRunnerStakingContractConfig,
    functionName: "earned",
    args: [userWalletAddress!],
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
  const { address: userWalletAddress } = useAccount();
  const { data, refetch, isSuccess } = useContractRead({
    ...starRunnerTokenContractConfig,
    functionName: "balanceOf",
    args: [userWalletAddress!],
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

export const useClaimRewards = () => {
  const { config } = usePrepareContractWrite({
    ...starRunnerStakingContractConfig,
    functionName: "claimReward",
  });
  const {
    write: claim,
    data,
    isLoading: isWaitingRewardsWritten,
  } = useContractWrite({
    ...config,
    onError: () => {
      ErrorMsg();
    },
  });
  return { claim, data, isWaitingRewardsWritten };
};
