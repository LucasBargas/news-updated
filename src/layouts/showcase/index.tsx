"use client";

import { LoadingSpinner } from "@/src/components/loading-spinner";
import { ShorterArticle } from "@/src/components/shorter-article";
import { useModal } from "@/src/hooks/use-modal";
import { useNews } from "@/src/hooks/use-news";
import { useNewsOrder } from "@/src/hooks/use-news-order";
import { INews } from "@/src/types/news";
import { usePathname } from "next/navigation";
import React from "react";
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

  const handleDeleteNews = async (newsToDelete: INews) => {
    setRef({ ...newsToDelete, action: "news-delete" });
    setModal(true);
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
              isFavoritePage={isFavoritePage}
              handleDeleteNews={handleDeleteNews}
            />
          ))}
        </React.Fragment>
      )}
    </section>
  );
};
