import getNewsId from "@/src/actions/news-actions/get-news-id";
import { Card } from "@/src/components/card";
import { CardActions } from "@/src/components/card/card-actions";
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
      <Card news={data} />
      <CardActions news={data} />
    </section>
  );
};

export default NewsById;
