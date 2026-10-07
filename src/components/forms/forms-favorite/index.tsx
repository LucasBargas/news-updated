import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

interface FormsFavoriteProps {
  isFavorite: boolean | undefined;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export const FormsFavorite = ({
  isFavorite,
  setIsFavorite,
}: FormsFavoriteProps) => {
  return (
    <div className={styles.formsFavorited}>
      <button
        type="button"
        title={isFavorite ? "Remover favorito" : "Favoritar"}
        onClick={() => setIsFavorite(!isFavorite)}
      >
        <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} />
      </button>
    </div>
  );
};
