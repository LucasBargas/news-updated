import styles from "./styles.module.css";

export const FormCategories = () => {
  return (
    <nav className={styles.formsCategoriesList}>
      <ul>
        <li>
          <span>Tecnologia</span>
          <button type="button">Apagar</button>
        </li>
        <li>
          <span>Política</span>
          <button type="button">Apagar</button>
        </li>
        <li>
          <span>Games</span>
          <button type="button">Apagar</button>
        </li>
      </ul>
    </nav>
  );
};
