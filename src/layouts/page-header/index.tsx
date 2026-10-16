"use client";

import getNewsList from "@/src/actions/news-actions/get-news-list";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import styles from "./styles.module.css";

export const PageHeader = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [resultCount, setResultCount] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!query) return;

    const fetchCount = async () => {
      const news = await getNewsList(query);
      setResultCount(news && news.length);
    };

    fetchCount();
  }, [query]);

  let title = `Notícias encontradas com: ${query ?? ""}`;
  const count = query ? resultCount : 0;

  let description =
    count === null
      ? "Buscando notícias..."
      : `${count} ${count === 1 ? "notícia encontrada." : "notícias encontradas."}`;

  if (pathname.includes("/home")) {
    title = "Todas as notícias";
    description = "As melhores notícias estão disponíveis aqui!";
  } else if (pathname.includes("/noticias-favoritas")) {
    title = "Notícias favoritas";
    description = "Veja as notícias favoritadas por você.";
  }

  return (
    <section className={styles.pageHeader}>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
};
