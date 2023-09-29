import { createContext, ReactNode } from "react";
import { useStakedBalance, useReward } from "../../hooks/contracts-api";
import { formatted } from "./formatUnits";

interface IContext {
  children: ReactNode;
}

interface IContextType {
  stakedBalance: string | undefined;
  rewardsAvailable: string | undefined;
}

export const AppContext = createContext<IContextType | null>(null);

export const AppProvider = ({ children }: IContext) => {
  const { data: stakedBalanceData } = useStakedBalance();
  const { data: rewardData } = useReward();
  const stakedBalance = formatted(stakedBalanceData).toFixed(0);
  const rewardsAvailable = formatted(rewardData).toFixed(0);

  return (
    <AppContext.Provider value={{ stakedBalance, rewardsAvailable }}>
      {children}
    </AppContext.Provider>
  );
};
