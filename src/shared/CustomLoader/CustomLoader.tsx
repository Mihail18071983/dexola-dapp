import React from "react";
import { Oval } from "react-loader-spinner";

interface IProps {
  width: number;
  height: number;
}

export const CustomLoader = ({ width, height }: IProps) => {
  return (
    <>
      <Oval
        width={width}
        height={height}
        strokeWidth={6}
        color="var(--accepted-color)"
        secondaryColor="rgba(110, 117, 139, 1)"
      />
    </>
  );
};
