import getCategoriesList from "@/src/actions/categories-actions/get-categories-list";
import getNewsId from "@/src/actions/news-actions/get-news-id";
import { Forms } from "@/src/components/forms";
import { notFound } from "next/navigation";

interface IPageParams {
  params: Promise<{
    id: string;
  }>;
}

const EditNewsPage = async ({ params }: IPageParams) => {
  const { id } = await params;
  const news = await getNewsId(id);
  const categories = await getCategoriesList();

  if (!news) return notFound();

  return (
    <section className="container">
      <Forms singleData={news} categoriesList={categories} />
    </section>
  );
};

export default EditNewsPage;
