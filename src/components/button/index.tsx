import React from "react";
import styles from "./styles.module.css";

import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IButtonProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode;
  color?: "darkButton" | "redButton";
  formButton?: boolean;
}

export const Button = ({
  children,
  color = "darkButton",
  formButton = false,
  ...props
}: IButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[color]}`} {...props}>
      {children}
      {formButton && <FontAwesomeIcon icon={faArrowRightLong} />}
    </button>
  );
};
