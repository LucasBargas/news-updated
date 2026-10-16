import { Showcase } from "@/src/components/showcase";

interface SearchPageProps {
  searchParams: Promise<{ q: string }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q } = await searchParams;

  return <Showcase param={q} />;
};

export default SearchPage;
