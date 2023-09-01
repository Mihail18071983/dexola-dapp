import React, { useState, useEffect } from "react";
import { animated, useTransition, easings } from "@react-spring/web";
import styles from "./Hero.module.scss";
import { MainTitle } from "./MainTitle";
import containerStyles from "../../Container.module.scss";
import imagePath1def from "../../assets/png/pic1_def.png";
import imagePath2def from "../../assets/png/pic2_def.png";
import imagePath1var2 from "../../assets/png/pic1_var2.png";
import imagePath2var2 from "../../assets/png/pic2_var2.png";
import imagePath1var3 from "../../assets/png/pic1_var3.png";
import imagePath2var3 from "../../assets/png/pic2_var3.png";
import imagePath1var4 from "../../assets/png/pic1_var4.png";
import imagePath2var4 from "../../assets/png/pic2_var4.png";
import imagePath1var5 from "../../assets/png/pic1_var5.png";
import imagePath2var5 from "../../assets/png/pic2_var5.png";

// eslint-disable-next-line react-refresh/only-export-components
export const heroVar1 = [
  {
    path: imagePath1def,
    name: "Legendary Artifact",
    level: "Legendary",
    totalGames: 189,
    gamesWon: 125,
    price: 2.5,
  },
  {
    path: imagePath1var2,
    name: "Epic Warrior",
    level: "Rare",
    totalGames: 134,
    gamesWon: 100,
    price: 1.5,
  },
  {
    path: imagePath1var3,
    name: "Mystic Spellbook",
    level: "Common",
    totalGames: 133,
    gamesWon: 123,
    price: 1.5,
  },
  {
    path: imagePath1var4,
    name: "Common Potion",
    level: "Heroic",
    totalGames: 87,
    gamesWon: 43,
    price: 1.2,
  },
  {
    path: imagePath1var5,
    name: "Heroic Blade",
    level: "Epic",
    totalGames: 56,
    gamesWon: 15,
    price: 2.8,
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const heroVar2 = [
  { path: imagePath2def },
  { path: imagePath2var2 },
  { path: imagePath2var3 },
  { path: imagePath2var4 },
  { path: imagePath2var5 },
];

export const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const transitions1 = useTransition(activeIndex, {
    key: activeIndex,
    initial: { opacity: 1 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 3000, easing: easings.easeInCubic },
  });

  const transitions2 = useTransition(activeIndex, {
    delay: 1000,
    key: activeIndex,
    initial: { opacity: 1 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 3000, easing: easings.easeInCubic },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % heroVar1.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <div className={containerStyles.container}>
          <div className={styles.wrapper}>
            <p className={styles.text}>
              Prepare to be transported beyond the boundaries of traditional
              gaming with the StarRunner Ecosystem – the beating heart that
              drives the adrenaline-charged galactic P2E odyssey of
              'StarRunner.'
            </p>
            <div className={styles.imageContainer}>
              {transitions1((style, i) => (
                <animated.div
                  key={i}
                  className={styles.image}
                  style={{
                    ...style,
                    backgroundImage: `url(${heroVar1[i].path})`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transform: "translateY(-100%)",
                  }}
                />
              ))}
              {transitions2((style, i) => (
                <animated.div
                  key={i}
                  className={styles.image}
                  style={{
                    ...style,
                    backgroundImage: `url(${heroVar2[i].path})`,
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateY(-100%)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          style={{ overflow: "hidden" }}
          className={containerStyles.container}
        >
          <MainTitle text="dexola camp" />
          <p className={styles.text1}>
            Prepare to be transported beyond the boundaries of traditional
            gaming with the StarRunner Ecosystem – the beating heart that drives
            the adrenaline-charged galactic P2E odyssey of 'StarRunner.'
          </p>
        </div>
      </section>
    </>
  );
};
