import React from "react";
import styles from "./style.module.css";

export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return <span className={styles.errorMessage}>{children}</span>;
};
