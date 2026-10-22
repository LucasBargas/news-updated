import getNewsId from "@/src/actions/news-actions/get-news-id";
import { Forms } from "@/src/components/forms";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface IPageParams {
  params: Promise<{
    id: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: IPageParams): Promise<Metadata> => {
  const { id } = await params;

  return {
    title: `NewsLBS | Editar Notícia | ${id}`,
  };
};

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
