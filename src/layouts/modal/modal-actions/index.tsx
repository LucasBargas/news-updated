import styles from "./styles.module.css";

export const ModalActions = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={styles.modalActions}>
      <button type="submit">Confirmar</button>

      <button type="button" onClick={onClose}>
        Cancelar
      </button>
    </div>
  );
};
