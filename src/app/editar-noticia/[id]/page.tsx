import getNewsId from "@/src/actions/get-news-id";
import { Forms } from "@/src/components/forms";
import { notFound } from "next/navigation";

interface IPageParams {
  params: Promise<{
    id: string;
  }>;
}

const EditNewsPage = async ({ params }: IPageParams) => {
  const { id } = await params;
  const data = await getNewsId(id);

  if (!data) return notFound();

  return (
    <section className="container">
      <Forms singleData={data} />
    </section>
  );
};

export default EditNewsPage;
