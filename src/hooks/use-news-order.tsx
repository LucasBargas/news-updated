"use client";
import React from "react";

export type OrderOption = "recent" | "oldest" | "random";

interface NewsOrderContextData {
  order: OrderOption;
  setOrder: (order: OrderOption) => void;
}

const NewsOrderContext = React.createContext<NewsOrderContextData | undefined>(
  undefined,
);

export const NewsOrderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [order, setOrder] = React.useState<OrderOption>("random");

  return (
    <NewsOrderContext.Provider value={{ order, setOrder }}>
      {children}
    </NewsOrderContext.Provider>
  );
};

export const useNewsOrder = () => {
  const context = React.useContext(NewsOrderContext);

  if (context === undefined) {
    throw new Error(
      "useNewsOrder deve ser usado dentro de um NewsOrderProvider",
    );
  }

  return context;
};
