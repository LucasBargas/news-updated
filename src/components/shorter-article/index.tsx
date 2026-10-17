import updateNews from "@/src/actions/news-actions/update-news";
import { INews } from "@/src/types/news";
import {
  faEye,
  faHeart as faHeartRegular,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";

interface IShorterArticleProps {
  news: INews;
  handleDeleteNews: (news: INews) => Promise<void>;
}

export const ShorterArticle = ({
  news,
  handleDeleteNews,
}: IShorterArticleProps) => {
  const [isFavorite, setIsFavorite] = React.useState(news.isFavorite);

  const createdAt = news.created_at
    ? new Date(news.created_at).toLocaleDateString("pt-BR")
    : "Data indisponível";

  const handleFavoriteNews = async () => {
    setIsFavorite(!isFavorite);

    if (news.id) {
      await updateNews(news.id, {
        ...news,
        isFavorite: !isFavorite,
      });
    }
  };

  return (
    <article className={styles.shorterArticle}>
      <div className={styles.shorterArticleHeader}>
        <Link href={`/noticia/${news.id}`}>{news.title}</Link>
        <button
          type="button"
          onClick={handleFavoriteNews}
          title={isFavorite ? "Remover favorito" : "Favoritar"}
        >
          <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} />
        </button>
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

        <div className={styles.shorterArticleActions}>
          <Link href={`/noticia/${news.id}`}>
            <FontAwesomeIcon icon={faEye} />
          </Link>
          <Link href={`/editar-noticia/${news.id}`} title="Editar notícia">
            <FontAwesomeIcon icon={faPencil} />
          </Link>
          <button
            type="button"
            onClick={() => handleDeleteNews(news)}
            title="Deletar notícia"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </article>
  );
};
