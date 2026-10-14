import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./not-found.module.css";

const NotFound = () => {
  return (
    <section className="container">
      <div className={styles.notFoundArea}>
        <div className={styles.notFoundAreaLeft}>
          <h1>404</h1>
        </div>

        <div className={styles.notFoundAreaRight}>
          <span></span>
          <strong>Página não encontrada</strong>
          <h3>Parece que esta notícia saiu do ar.</h3>
          <p>
            O endereço pode estar incorreto ou a página que você procura pode
            ter sido removida.
          </p>

          <Link href="/home">
            <FontAwesomeIcon icon={faArrowLeftLong} />
            <span>Voltar para Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
