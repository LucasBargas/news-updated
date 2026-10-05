"use client";

import { HeaderLogo } from "@/src/layouts/header/header-logo";
import { HeaderNav } from "@/src/layouts/header/header-nav";
import { HeaderSearch } from "@/src/layouts/header/header-search";
import React from "react";
import styles from "./styles.module.css";

export const Header = () => {
  const [active, setActive] = React.useState(false);
  // const isMobileNav = useMedia("(max-width: 768px)");

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <HeaderLogo handleClick={handleClick} />

        <div className={`${styles.headerRight} ${active ? styles.active : ""}`}>
          <HeaderNav handleClick={handleClick} />
          <HeaderSearch />
        </div>

        <button className={styles.headerMobileBtn} onClick={handleClick}>
          Menu
        </button>
      </div>
    </header>
  );
};
