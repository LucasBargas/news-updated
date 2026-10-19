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
  setNews: React.Dispatch<React.SetStateAction<INews[] | null>>;
  isFavoritePage: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShorterArticle = (props: IShorterArticleProps) => {
  const [isFavorite, setIsFavorite] = React.useState(props.news.isFavorite);

  const createdAt = props.news.created_at
    ? new Date(props.news.created_at).toLocaleDateString("pt-BR")
    : "Data indisponível";

  const handleFavoriteNews = async () => {
    const nextFavoriteState = !isFavorite;
    setIsFavorite(nextFavoriteState);

    if (props.isFavoritePage && !nextFavoriteState) {
      props.setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 400));

      props.setNews(
        (prev) => prev?.filter((item) => item.id !== props.news.id) ?? null,
      );

      props.setIsLoading(false);
    }

    if (props.news.id) {
      try {
        await updateNews(props.news.id, {
          ...props.news,
          isFavorite: nextFavoriteState,
        });
      } catch (error) {
        console.error("Erro ao atualizar favorito no banco de dados:", error);
        setIsFavorite(!nextFavoriteState);
      }
    }
  };

  return (
    <article className={styles.shorterArticle}>
      <div className={styles.shorterArticleHeader}>
        <Link href={`/noticia/${props.news.id}`}>{props.news.title}</Link>
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
            <Link href={`/pesquisa?q=${props.news.category}`}>
              {props.news.category}
            </Link>
          </li>
          <li>
            <strong>Autoria:</strong>{" "}
            <Link href={`/pesquisa?q=${props.news.author}`}>
              {props.news.author}
            </Link>
          </li>
          <li>
            <strong>Postado em:</strong> <span>{createdAt}</span>
          </li>
        </ul>

        <div className={styles.shorterArticleActions}>
          <Link href={`/noticia/${props.news.id}`} title="Visualizar notícia">
            <FontAwesomeIcon icon={faEye} />
          </Link>
          <Link
            href={`/editar-noticia/${props.news.id}`}
            title="Editar notícia"
          >
            <FontAwesomeIcon icon={faPencil} />
          </Link>
          <button
            type="button"
            onClick={() => props.handleDeleteNews(props.news)}
            title="Deletar notícia"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </article>
  );
};
