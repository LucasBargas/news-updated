import { Button } from "@/src/components/button";
import styles from "./styles.module.css";

export const ModalActions = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={styles.modalActions}>
      <Button type="submit">Confirmar</Button>

      <Button type="button" onClick={onClose} color="redButton">
        Cancelar
      </Button>
    </div>
  );
};
