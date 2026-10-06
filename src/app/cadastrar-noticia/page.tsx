import { NewsForm } from "@/src/components/news-form";
import styles from "./styles.module.css";

const RegisterPage = () => {
  return (
    <section className={`container ${styles.registerArea}`}>
      <NewsForm />
    </section>
  );
};

export default RegisterPage;
