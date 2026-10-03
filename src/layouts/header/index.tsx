"use client";

import useMedia from "@/src/hooks/use-media";
import { HeaderLogo } from "@/src/layouts/header/header-logo";
import { HeaderNav } from "@/src/layouts/header/header-nav";
import { HeaderSearch } from "@/src/layouts/header/header-search";
import React from "react";
import styles from "./styles.module.css";

export const Header = () => {
  const [active, setActive] = React.useState(false);
  const isMobileNav = useMedia("(max-width: 768px)");

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <HeaderLogo />

        <div
          className={`${styles.headerRight} ${isMobileNav ? styles.isMobileNav : ""} ${active ? styles.active : ""}`}
        >
          <HeaderNav setActive={setActive} />
          <HeaderSearch />
        </div>

        {isMobileNav && <button onClick={handleClick}>Menu</button>}
      </div>
    </header>
  );
};
