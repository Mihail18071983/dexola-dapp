import React from "react";
import { IData } from "../../shared/api/heroes";
import styles from "./Table.module.scss";

interface IProps {
  items: IData[];
}

export const Table = ({ items }: IProps) => {
  return (
    <div className={styles.container}>
    <table className={styles.table}>
      <thead>
        <tr className={styles.tr}>
          <th className={styles.head}></th>
          <th className={styles.head}>NFT Name</th>
          <th className={styles.head}>Rarity Level</th>
          <th className={styles.head}>Total Games</th>
          <th className={styles.head}>Games Won</th>
          <th className={styles.head}>Price (ETH)</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {items.map((item: IData) => (
          <tr className={styles.tr} key={item.id}>
            <td className={styles.avatar}>
              <img
                className={styles.img}
                src={item.avatar}
                alt={item.name}
              />
            </td>
            <td className={styles.name}>{item.name}</td>
            <td className={styles.name}>{item.level}</td>
            <td className={styles.name}>{item.totalGames}</td>
            <td className={styles.name}>{item.gamesWon}</td>
            <td className={styles.name}>{item.price}</td>
          </tr>
        ))}
      </tbody>
      </table>
      </div>
  );
};
