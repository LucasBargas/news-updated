import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className="container">
      <div className={styles.loading}>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
};

export default Loading;
