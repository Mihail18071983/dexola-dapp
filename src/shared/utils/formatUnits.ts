import { formatUnits } from "viem/utils";
export const formatted = (data:unknown) => data
    ? +formatUnits(data as bigint, 0)
    : 0;