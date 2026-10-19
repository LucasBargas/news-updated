"use client";

import deleteNews from "@/src/actions/news-actions/delete-news";
import { useCategories } from "@/src/hooks/use-categories";
import { useNews } from "@/src/hooks/use-news";
import { useNewsOrder } from "@/src/hooks/use-news-order";
import { INews } from "@/src/types/news";
import { usePathname, useRouter } from "next/navigation"; // 1. Importou o useRouter
import React from "react";
import { LoadingSpinner } from "../loading-spinner";
import { ShorterArticle } from "../shorter-article";
import { ShowcaseMessage } from "./showcase-message";
import styles from "./styles.module.css";

interface IShowcaseProps {
  param?: string;
  isFavoritePage?: boolean;
}

export const Showcase = ({ param, isFavoritePage = false }: IShowcaseProps) => {
  const { news, setNews, isLoading, setIsLoading, fetchNews } = useNews();
  const pathname = usePathname();
  const isSearchPage = pathname.startsWith("/pesquisa");
  const { order } = useNewsOrder();
  const { setCategories } = useCategories();
  const router = useRouter();

  const removeNewsAPI = async (newsToDelete: INews) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    try {
      await deleteNews(newsToDelete);
      return true;
    } catch (error) {
      console.error("Erro ao deletar notícia:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNews = async (newsToDelete: INews) => {
    if (!newsToDelete.id) return;

    const success = await removeNewsAPI(newsToDelete);
    if (!success) return;

    const remainingNewsInSameCategory = news?.filter(
      (item) =>
        item.categorySlug === newsToDelete.categorySlug &&
        item.id !== newsToDelete.id,
    );

    const count = remainingNewsInSameCategory?.length ?? 0;

    if (count === 0) {
      setCategories((prev) => {
        if (!prev) return null;
        return prev.filter((el) => el.title !== newsToDelete.category);
      });

      if (!isSearchPage)
        router.push(isFavoritePage ? "/noticias-favoritas" : "/home");
    }

    setNews(
      (prev) => prev?.filter((item) => item.id !== newsToDelete.id) ?? null,
    );
  };

  React.useEffect(() => {
    fetchNews(param ?? "", order, isFavoritePage);
  }, [fetchNews, isFavoritePage, order, param]);

  return (
    <section className={!isSearchPage ? styles.showcase : ""}>
      {isLoading && <LoadingSpinner />}

      {!isLoading && news?.length === 0 && (
        <ShowcaseMessage isFavoritePage={isFavoritePage} pathname={pathname} />
      )}

      {!isLoading && news && news.length > 0 && (
        <React.Fragment>
          {news.map((el) => (
            <ShorterArticle
              key={el.id}
              news={el}
              setNews={setNews}
              isFavoritePage={isFavoritePage}
              handleDeleteNews={handleDeleteNews}
              setIsLoading={setIsLoading}
            />
          ))}
        </React.Fragment>
      )}
    </section>
  );
};
