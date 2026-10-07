import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
// Importando o coração preenchido (preto/sólido) e renomeando
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

// Importando o coração vazado (claro/regular) e renomeando
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

interface FormsFavoriteProps {
  isFavorite: boolean;
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
