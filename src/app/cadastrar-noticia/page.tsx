import { NewsForm } from "@/src/components/news-form";
import styles from "./styles.module.css";

const RegisterPage = () => {
  return (
    <section className={`container ${styles.registerArea}`}>
      <NewsForm id="123" />
    </section>
  );
};

export default RegisterPage;
