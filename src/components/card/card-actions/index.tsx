"use client";

import deleteNews from "@/src/actions/delete-news";
import updateNews from "@/src/actions/update-news";
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
import React from "react";
import styles from "./styles.module.css";

interface ICardActionsProps {
  news: INews;
}

export const CardActions = ({ news }: ICardActionsProps) => {
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
    if (news.id) await deleteNews(news.id);
  };

  return (
    <div className={styles.cardActionsWrapper}>
      <div className={styles.cardActionsLeft}>
        <button onClick={handleDeleteNews} title="Deletar notícia">
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <Link
          href={`/editar-noticia/${news.id}`}
          title="Editar notícia"
          className={styles.suaClasseDeBotao}
        >
          <FontAwesomeIcon icon={faPencil} />
        </Link>
      </div>

      <div className={styles.cardActionsRight}>
        <button
          type="button"
          onClick={handleEditNews}
          title={isFavorite ? "Remover favorito" : "Favoritar"}
        >
          <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} />
        </button>
      </div>
    </div>
  );
};
