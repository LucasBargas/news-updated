"use client";

import { Button } from "@/src/components/button";
import { LoadingSpinner } from "@/src/components/loading-spinner";
import { ShorterArticle } from "@/src/components/shorter-article";
import { useModal } from "@/src/hooks/use-modal";
import { useNews } from "@/src/hooks/use-news";
import { useNewsOrder } from "@/src/hooks/use-news-order";
import { INews } from "@/src/types/news";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { ShowcaseMessage } from "./showcase-message";
import styles from "./styles.module.css";

interface IShowcaseProps {
  param?: string;
}

export const Showcase = ({ param }: IShowcaseProps) => {
  const { news, isLoading, fetchNews } = useNews();
  const pathname = usePathname();
  const isSearchPage = pathname.startsWith("/pesquisa");
  const isFavoritePage = pathname.startsWith("/noticias-favoritas");
  const { order } = useNewsOrder();
  const { setRef, setModal } = useModal();
  const [pageSize, setPageSize] = useState(6);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleDeleteNews = async (newsToDelete: INews) => {
    setRef({ ...newsToDelete, action: "news-delete" });
    setModal(true);
  };

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 480px)");

    const updatePageSize = () => {
      const nextPageSize = mediaQuery.matches ? 4 : 6;

      setPageSize(nextPageSize);
      setVisibleCount(nextPageSize);
    };

    updatePageSize();

    mediaQuery.addEventListener("change", updatePageSize);

    return () => {
      mediaQuery.removeEventListener("change", updatePageSize);
    };
  }, []);

  React.useEffect(() => {
    fetchNews(param ?? "", order, isFavoritePage);
  }, [fetchNews, isFavoritePage, order, param]);

  const displayedNews = news?.slice(0, visibleCount);

  return (
    <section className={!isSearchPage ? styles.showcase : ""}>
      {isLoading && <LoadingSpinner />}

      {!isLoading && news?.length === 0 && (
        <ShowcaseMessage isFavoritePage={isFavoritePage} pathname={pathname} />
      )}

      {!isLoading && displayedNews && displayedNews.length > 0 && (
        <React.Fragment>
          {displayedNews.map((el) => (
            <ShorterArticle
              key={el.id}
              news={el}
              isFavoritePage={isFavoritePage}
              handleDeleteNews={handleDeleteNews}
            />
          ))}

          {news && visibleCount < news.length && (
            <Button
              onClick={() => setVisibleCount((prev) => prev + pageSize)}
              style={{ marginInline: "auto" }}
            >
              Carregar mais
            </Button>
          )}
        </React.Fragment>
      )}
    </section>
  );
};
