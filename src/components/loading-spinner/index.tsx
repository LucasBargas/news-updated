import styles from "./styles.module.css";

export const LoadingSpinner = () => {
  return (
    <div className="container">
      <div className={styles.loading}>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
};
