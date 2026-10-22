import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import styles from "./styles.module.css";

interface ModalBodyProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const ModalBody = (props: ModalBodyProps) => {
  const handleCloseModal = (e: ReactMouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) props.onClose();
  };

  return (
    <section
      className={`${styles.modalWrapper} ${props.isOpen ? styles.active : ""}`}
      onClick={handleCloseModal}
    >
      <div className={styles.modal}>
        <div className={styles.modalClose}>
          <button type="button" onClick={props.onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {props.children}
      </div>
    </section>
  );
};
