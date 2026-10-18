"use client";

import { useNews } from "@/src/hooks/use-news";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";

export const PageHeader = () => {
  const { news } = useNews();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const count = news ? news.length : null;

  let title = `Notícias encontradas com: ${query ?? ""}`;

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
