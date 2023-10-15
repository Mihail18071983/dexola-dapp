import { createContext, ReactNode } from "react";
import { useStakedBalance, useReward } from "../../hooks/contracts-api";
import { formatted } from "./formatUnits";

interface IContext {
  children: ReactNode;
}

interface IContextType {
  stakedBalanceData: bigint | undefined;
  rewardsAvailable: string | undefined;
}

export const AppContext = createContext<IContextType | null>(null);

export const AppProvider = ({ children }: IContext) => {
  const { data: stakedBalanceData } = useStakedBalance();
  const { data: rewardData } = useReward();

  const rewardsAvailable = formatted(rewardData).toFixed(0);

  return (
    <AppContext.Provider value={{ stakedBalanceData, rewardsAvailable }}>
      {children}
    </AppContext.Provider>
  );
};
