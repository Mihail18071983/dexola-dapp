import React from "react";

interface IProps {
  width: string;
  heigth: string;
  classname?: string;
}

export const Help = ({ width, heigth, classname }: IProps) => {
  return (
    <svg className={classname} xmlns="http://www.w3.org/2000/svg" width={width} height={heigth} fill="none">
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.672 10.1a2.4 2.4 0 0 1 4.664.8c0 1.6-2.4 2.4-2.4 2.4M12 16.5h.008m7.992-4a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
      />
    </svg>
  );
};
