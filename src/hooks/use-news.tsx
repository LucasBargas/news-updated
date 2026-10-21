"use client";

import React from "react";
import getNewsList, {
  OrderOption,
} from "../actions/news-actions/get-news-list";
import type { INews } from "../types/news";

interface NewsContextData {
  news: INews[] | null;
  setNews: React.Dispatch<React.SetStateAction<INews[] | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchNews: (
    param: string,
    order: OrderOption,
    isFavoritePage: boolean,
  ) => Promise<void>;
}

const NewsContext = React.createContext<NewsContextData | undefined>(undefined);

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [news, setNews] = React.useState<INews[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchNews = React.useCallback(
    async (param: string, order: OrderOption, isFavoritePage: boolean) => {
      try {
        setIsLoading(true);
        const data = await getNewsList(param, order, isFavoritePage);
        setNews(data);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return (
    <NewsContext.Provider
      value={{ news, setNews, isLoading, setIsLoading, fetchNews }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = React.useContext(NewsContext);
  if (!context) {
    throw new Error("useNews deve ser usado dentro de um NewsProvider");
  }
  return context;
};
