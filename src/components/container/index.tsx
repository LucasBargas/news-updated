import React from "react";
import styles from "./styles.module.css";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
