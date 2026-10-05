"use client";

import { HeaderLogo } from "@/src/layouts/header/header-logo";
import { HeaderNav } from "@/src/layouts/header/header-nav";
import { HeaderSearch } from "@/src/layouts/header/header-search";
import React from "react";
import { HeaderMobileButton } from "./header-mobile-button";
import styles from "./styles.module.css";

export const Header = () => {
  const [active, setActive] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleClick = () => {
    setActive(false);
    if (value.length) setValue("");
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <HeaderLogo handleClick={handleClick} />

        <div className={`${styles.headerRight} ${active ? styles.active : ""}`}>
          <HeaderNav handleClick={handleClick} />
          <HeaderSearch
            value={value}
            setValue={setValue}
            handleClick={handleClick}
          />
        </div>

        <HeaderMobileButton active={active} setActive={setActive} />
      </div>
    </header>
  );
};
