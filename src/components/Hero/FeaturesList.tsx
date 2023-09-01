import React from "react";
import styles from "./FeaturesList.module.scss";
import { Button } from "../../shared/Button/Button";

const imageItems = [
  {
    id: "01",
    path: "src/assets/images/image1.jpg",
    name: "STRU Token sale",
    text: "The StarRunner Token the exclusive crypto currency fueling the adventure of the Play-to-Earn sensation.",
  },
  {
    id: "02",
    path: "src/assets/images/image2.jpg",
    name: "Staking",
    text: "Join a thriving community of stakers, united by their passion for exploration, strategy, and gaming.",
  },
  {
    id: "03",
    path: "src/assets/images/image3.jpg",
    name: "NFT minting",
    text: "Every StarRunner NFT tells a story – YOUR story. This NFT encapsulates the essence of your journey like never before.",
  },
];

export const FeaturesList = () => {
  return (
    <ul className={styles.list}>
      {imageItems.map((item) => {
        return (
          <li key={item.id} className={styles.item}>
            <img loading="lazy" className={styles.image} src={item.path} alt={item.name} />
            <div className={styles.contentWrapper}>
              <h4 className={styles.title}>
                <span>{item.id}</span>
                <span>{item.name}</span>
              </h4>
              <p className={styles.text}>{item.text}</p>
            </div>
            <Button type="button">
              <span className={styles.btnContent}>discover now</span>
            </Button>
          </li>
        );
      })}
    </ul>
  );
};
