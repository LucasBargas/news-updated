import getNewsId from "@/src/actions/get-news-id";
import { NewsForm } from "@/src/components/news-form";

interface IPageParams {
  params: Promise<{
    id: string;
  }>;
}

const EditNewsPage = async ({ params }: IPageParams) => {
  const { id } = await params;
  const data = await getNewsId(id);

  if (!data) return null;

  return (
    <section className="container">
      <NewsForm singleData={data} />
    </section>
  );
};

export default EditNewsPage;
