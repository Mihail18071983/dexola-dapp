import React from "react";
import styles from "./TopNfts.module.scss";
import containerStyles from "../../Container.module.scss";
import { SectionTitle } from "../../shared/Title/SectionTitle";
import { Table } from "../Table/Table";
import { TableMobile } from "../Table/TableMobile";
import { IData } from "../../shared/api/heroes";


interface IProps {
  isShown: boolean;
  items:IData[];
}


export const TopNfts = ({isShown, items}:IProps) => {  
  return (
    <section className={styles.topNfts}>
      <div className={containerStyles.container}>
        <SectionTitle part1="Top NFTs" part2="02" />
        {!isShown ?(<Table items={items} />):
          <TableMobile items={items } />}
      </div>
    </section>
  );
};
