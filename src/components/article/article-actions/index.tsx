"use client";

import deleteNews from "@/src/actions/news-actions/delete-news";
import updateNews from "@/src/actions/news-actions/update-news";
import { INews } from "@/src/types/news";
import {
  faHeart as faHeartRegular,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./styles.module.css";

interface IArticleActionsProps {
  news: INews;
}

export const ArticleActions = ({ news }: IArticleActionsProps) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = React.useState(news.isFavorite);

  const handleEditNews = async () => {
    setIsFavorite(!isFavorite);

    if (news.id) {
      await updateNews(news.id, {
        ...news,
        isFavorite: !isFavorite,
      });
    }
  };

  const handleDeleteNews = async () => {
    if (!news.id) return;

    try {
      await deleteNews(news);
      router.push("/home");
    } catch (error) {
      console.error("Erro ao deletar notícia:", error);
    }
  };

  return (
    <article className={styles.articleActionsWrapper}>
      <div className={styles.articleActionsLeft}>
        <button
          type="button"
          onClick={handleDeleteNews}
          title="Deletar notícia"
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <Link href={`/editar-noticia/${news.id}`} title="Editar notícia">
          <FontAwesomeIcon icon={faPencil} />
        </Link>
      </div>

      <div className={styles.articleActionsRight}>
        <button
          type="button"
          onClick={handleEditNews}
          title={isFavorite ? "Remover favorito" : "Favoritar"}
        >
          <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} />
        </button>
      </div>
    </article>
  );
};
