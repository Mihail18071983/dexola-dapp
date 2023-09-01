import React from "react";
import { IData } from "../../shared/api/heroes";
import styles from "./TableMobile.module.scss";

interface IProps {
  items: IData[];
}

export const TableMobile = ({ items }: IProps) => {
  return (
    <div className={styles.container}>
      {items.map((item: IData) => (
        <table key={item.id} className={ styles.table}>
          <tbody className={styles.tbody}>
            <tr className={styles.row}>
              <th colSpan={2} className={styles.name}>
                <span>{item.id}.</span> {}
                <span>{item.name}</span>
              </th>
              <th className={styles.price}>{item.price} ETH</th>
            </tr>
            <tr>
              <td rowSpan={3} className={styles.avatar}>
                <img className={styles.img} src={item.avatar} alt={item.name} />
              </td>
              <td className={styles.title}>Rarity:</td>
              <td className={styles.score}>{item.level}</td>
            </tr>
            <tr>
              <td className={styles.title}>Total Games:</td>
              <td className={styles.score}>{item.totalGames}</td>
            </tr>
            <tr>
              <td className={styles.title}>Games Won:</td>
              <td className={styles.score}>{item.gamesWon}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};
