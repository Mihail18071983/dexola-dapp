import React, { MutableRefObject } from "react";
import styles from "./JoinUs.module.scss";
import containerStyles from "../../Container.module.scss";
import { SectionTitle } from "../../shared/Title/SectionTitle";
import { SubTitle } from "../../shared/SubTitle/SubTitle";
import { Content } from "../../shared/Content/Content";
import { Form } from "../Form/Form";
import { ReactComponent as Arrow } from "../../assets/svg/arrowH.svg";

interface IProps {
  joinUsRef: MutableRefObject<HTMLElement | null>;
}

export const JoinUs = ({ joinUsRef }: IProps) => {
  return (
    <section ref={joinUsRef} className={styles.joinUs}>
      <div className={`${containerStyles.container}`}>
        <SectionTitle part1={"join us"} part2={"03"} />
        <div className={styles.wrapper}>
          <div className={styles.contentWrapper}>
            <SubTitle text="Experience the Power of StarRunner" />
            <Content
              className={styles.content}
              text="Join Our Community and Embark on a Journey of Opportunities. 
        Discover the full range of our services that cater to your needs.
        We've got you covered with top-notch solutions."
            />
            <Arrow className={styles.arrow} />
          </div>
          <Form />
        </div>
      </div>
    </section>
  );
};
