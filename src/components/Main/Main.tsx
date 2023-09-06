import React, { FC } from "react";
import styles from "./Main.module.scss";
import containerStyles from "../../Container.module.scss";

export const Main: FC = () => {
  return (
    <main>
      <div className={containerStyles.container}>Main</div>
    </main>
  );
};
