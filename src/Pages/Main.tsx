import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import { Features } from "../components/Features/Features";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { Hero } from "../components/Hero/Hero";
import { JoinUs } from "../components/JoinUs/JoinUs";
import { TopNfts } from "../components/TopNfts/TopNfts";
import { useWindowSize } from "../hooks/useWindowsSize";
import { IData } from "../shared/api/heroes";
import { getAll } from "../shared/api/heroes";

export const Main: FC = () => {
  const [heroes, setHeroes] = useState<IData[]>([]);
  const headerRef = useRef<HTMLElement | null>(null);
  const joinUsRef = useRef<HTMLElement | null>(null);
  const [width] = useWindowSize();
  const [height, setHeight] = useState<number>(0);
  const [isShown, setIsShown] = useState(false);
  const [isFooterShown, setIsFooterShown] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      setHeight(headerHeight);
    }
    width > 743 ? setIsShown(false) : setIsShown(true);
    width > 743 && width < 1440
      ? setIsFooterShown(false)
      : setIsFooterShown(true);
  }, [width]);

  const scrollToJoinUs = () => {
    if (joinUsRef.current) {
      joinUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await getAll();
      setHeroes(data!);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <>
      <Header scrollToJoinUs={scrollToJoinUs} headerRef={headerRef} />
      <main style={{ marginTop: height }}>
        <Hero />
        <Features />
        <TopNfts items={heroes} isShown={isShown} />
        <JoinUs joinUsRef={joinUsRef} />
      </main>
      <Footer isShown={isFooterShown} />
    </>
  );
};
