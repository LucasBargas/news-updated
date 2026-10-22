import React from "react";
import styles from "./styles.module.css";

export const ModalHeader = (props: { title: string; description?: string }) => {
  return (
    <React.Fragment>
      <h3 className={styles.modalHeaderTitle}>{props.title}</h3>
      {props.description && (
        <p className={styles.modalHeaderDescription}>{props.description}</p>
      )}
    </React.Fragment>
  );
};
