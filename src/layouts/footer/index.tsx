import styles from "./styles.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <h3>NewsLBS</h3>
            <p>Notícias que conectam informação, contexto e pessoas.</p>
          </div>

          <div className={styles.footerRight}>
            <h4>Sobre o projeto</h4>
            <p>
              Desenvolvido por{" "}
              <a
                href="https://projetoslucasbargas.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lucas Bargas
              </a>{" "}
              com base em uma referência visual e codificação própria.
            </p>
          </div>

          <div className={styles.footerBottom}>
            <p>
              © {new Date().getFullYear()} NewsLBS. Todos os direitos
              reservados.
            </p>
            <a
              href="https://github.com/LucasBargas/news-updated"
              target="_blank"
              rel="noopener noreferrer"
            >
              Clique aqui para visualizar o repositório no GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
