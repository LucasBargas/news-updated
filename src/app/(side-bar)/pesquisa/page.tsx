import getNewsList from "@/src/actions/news-actions/get-news-list";
import { Showcase } from "@/src/layouts/showcase";

interface SearchPageProps {
  searchParams: Promise<{ q: string }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q } = await searchParams;
  await getNewsList(q); // loading activation

  return <Showcase param={q} />;
};

export default SearchPage;
