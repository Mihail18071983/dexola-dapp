import { AppContext } from "../shared/utils/Appcontext";
import { useContext } from "react";

export const useAppContextValue = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context error");
  }
  return context;
};