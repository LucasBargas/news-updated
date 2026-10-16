import getNewsId from "@/src/actions/news-actions/get-news-id";
import { Article } from "@/src/components/article";
import { ArticleActions } from "@/src/components/article/article-actions";
import { notFound } from "next/navigation";

interface IPageParams {
  params: Promise<{
    id: string;
  }>;
}

const NewsById = async ({ params }: IPageParams) => {
  const { id } = await params;
  const data = await getNewsId(id);

  if (!data) return notFound();

  return (
    <section className="container">
      <Article news={data} />
      <ArticleActions news={data} />
    </section>
  );
};

export default NewsById;
