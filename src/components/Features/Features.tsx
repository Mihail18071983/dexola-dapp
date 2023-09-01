import React from "react";
import styles from "./Features.module.scss";
import containerStyles from "../../Container.module.scss";
import { SectionTitle } from "../../shared/Title/SectionTitle";
import { SubTitle } from "../../shared/SubTitle/SubTitle";
import { FeaturesList } from "../Hero/FeaturesList";
import { Content } from "../../shared/Content/Content";

export const Features = () => {
  return (
    <section className={styles.features}>
      <div className={containerStyles.container}>
        <SectionTitle part1={"Features"} part2={"01"} />
        <div className={styles.infoWrapper}>
          <SubTitle text="About StarRunner" />
          <Content
            text=" The StarRunner Blockchain Ecosystem isn't a mere playground; it's a
            living, evolving entity that adapts to the desires and creativity of
            its players."
          />
        </div>
        <FeaturesList />
      </div>
    </section>
  );
};
