"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type OrderOption = "recent" | "oldest" | "random";

interface NewsOrderContextData {
  order: OrderOption;
  setOrder: (order: OrderOption) => void;
}

const NewsOrderContext = createContext<NewsOrderContextData | undefined>(
  undefined,
);

export const NewsOrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<OrderOption>("random");

  return (
    <NewsOrderContext.Provider value={{ order, setOrder }}>
      {children}
    </NewsOrderContext.Provider>
  );
};

export const useNewsOrder = () => {
  const context = useContext(NewsOrderContext);

  if (context === undefined) {
    throw new Error(
      "useNewsOrder deve ser usado dentro de um NewsOrderProvider",
    );
  }

  return context;
};
