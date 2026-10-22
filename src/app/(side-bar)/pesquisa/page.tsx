import getNewsList from "@/src/actions/news-actions/get-news-list";
import { Showcase } from "@/src/layouts/showcase";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: Promise<{ q: string }>;
}

export const metadata: Metadata = {
  title: "NewsLBS | Pesquisa",
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

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q } = await searchParams;
  await getNewsList(q); // loading activation

  return <Showcase param={q} />;
};

export default SearchPage;
