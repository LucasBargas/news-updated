import { INews } from "@/src/types/news";
import Link from "next/link";
import styles from "./styles.module.css";

interface IShorterArticleProps {
  news: INews;
}

export const ShorterArticle = ({ news }: IShorterArticleProps) => {
  const createdAt = news.created_at
    ? new Date(news.created_at).toLocaleDateString("pt-BR")
    : "Data indisponível";

  return (
    <article className={styles.shorterArticle}>
      <div className={styles.shorterArticleHeader}>
        <Link href={`/noticia/${news.id}`}>{news.title}</Link>
        <button>Fav</button>
      </div>

      <div className={styles.shorterArticleDetails}>
        <ul>
          <li>
            <strong>Categoria:</strong>{" "}
            <Link href={`/pesquisa?q=${news.category}`}>{news.category}</Link>
          </li>
          <li>
            <strong>Autoria:</strong>{" "}
            <Link href={`/pesquisa?q=${news.author}`}>{news.author}</Link>
          </li>
          <li>
            <strong>Postado em:</strong> <span>{createdAt}</span>
          </li>
        </ul>

        <div className={styles.shorterArticleActions}>Ações</div>
      </div>
    </article>
  );
};
