"use client";

import { INews } from "@/src/types/news";
import Link from "next/link";
import styles from "./styles.module.css";

interface ICardProps {
  news: INews;
}

export const Article = ({ news }: ICardProps) => {
  const redirect = (value: string) => {
    return `/pesquisa?q=${encodeURIComponent(value)}`;
  };

  const createdAt = news.created_at ? new Date(news.created_at) : null;

  const formattedDate =
    createdAt && !Number.isNaN(createdAt.getTime())
      ? new Intl.DateTimeFormat("pt-BR", {
          dateStyle: "short",
          timeZone: "America/Sao_Paulo",
        }).format(createdAt)
      : "—";

  return (
    <div className={styles.articleWrapper}>
      <div className={styles.articleHeader}>
        <span></span>
        <h3>
          <Link href={redirect(news.category)}>
            {news.category.toUpperCase()}
          </Link>
        </h3>
        <h1>{news.title}</h1>
      </div>

      <div className={styles.articleContent}>
        <p>{news.content}</p>
      </div>

      <div className={styles.articleBottom}>
        <ul>
          <li>
            <h4>Categoria:</h4>
            <Link href={redirect(news.category)}>{news.category}</Link>
          </li>
          <li>
            <h4>Autoria:</h4>
            <Link href={redirect(news.author)}>{news.author}</Link>
          </li>
          <li>
            <h4>Postado em:</h4>
            <p>{formattedDate}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
