import getNewsList from "@/src/actions/news-actions/get-news-list";
import { Showcase } from "@/src/layouts/showcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NewsLBS | Notícias Favoritas",
  description:
    "Notícias e atualizações sobre diversos assuntos. Fique informado com as últimas notícias e tendências do momento.",
  keywords: [
    "Lucas Bargas",
    "NewsLBS",
    "notícias",
    "atualizações",
    "informações",
    "tendências",
    "assuntos diversos",
  ],
};

const FavoritesNews = async () => {
  await getNewsList(); // loading activation

  return <Showcase />;
};

export default FavoritesNews;
