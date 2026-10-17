"use client";

import deleteNews from "@/src/actions/news-actions/delete-news";
import getNewsList from "@/src/actions/news-actions/get-news-list";
import { useNewsOrder } from "@/src/hooks/use-news-order";
import { INews } from "@/src/types/news";
import { usePathname } from "next/navigation";
import React from "react";
import { LoadingSpinner } from "../loading-spinner";
import { ShorterArticle } from "../shorter-article";
import styles from "./styles.module.css";

interface IShowcaseProps {
  param?: string;
  isFavoritePage?: boolean;
}

export const Showcase = ({ param, isFavoritePage = false }: IShowcaseProps) => {
  const [news, setNews] = React.useState<null | INews[]>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const pathname = usePathname();
  const isSearchPage = pathname.startsWith("/pesquisa");
  const { order } = useNewsOrder();

  const handleDeleteNews = async (newsToDelete: INews) => {
    if (!newsToDelete.id) return;

    setIsLoading(true);

    try {
      await deleteNews(newsToDelete.id);
      setNews(
        (prev) => prev?.filter((item) => item.id !== newsToDelete.id) ?? null,
      );
    } catch (error) {
      console.error("Erro ao deletar notícia:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const data = await getNewsList(param, order, isFavoritePage);
        setNews(data);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [param, isFavoritePage, order]);

  return (
    <section className={!isSearchPage ? styles.showcase : ""}>
      {isLoading && <LoadingSpinner />}

      {!isLoading && news?.length === 0 && <p>Nenhuma notícia encontrada.</p>}

      {!isLoading && news && news.length > 0 && (
        <React.Fragment>
          {news.map((el) => (
            <ShorterArticle
              key={el.id}
              news={el}
              handleDeleteNews={handleDeleteNews}
            />
          ))}
        </React.Fragment>
      )}
    </section>
  );
};
