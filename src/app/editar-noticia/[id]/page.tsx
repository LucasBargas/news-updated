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

  if (!news) return notFound();

  return (
    <section className="container">
      <Forms singleData={news} />
    </section>
  );
};

export default EditNewsPage;
