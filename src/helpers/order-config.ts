import { OrderOption } from "../hooks/use-news-order";

export interface IOrder {
  title: string;
  ref: OrderOption;
}

export const orderList: IOrder[] = [
  {
    title: "Mais recentes",
    ref: "recent",
  },
  {
    title: "Mais antigas",
    ref: "oldest",
  },
  {
    title: "Aleatórias",
    ref: "random",
  },
];
