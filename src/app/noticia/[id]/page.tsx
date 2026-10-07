import getNewsId from "@/src/actions/get-news-id";

interface IPageParams {
  params: Promise<{
    id: string;
  }>;
}

const NewsById = async ({ params }: IPageParams) => {
  const { id } = await params;
  const data = await getNewsId(id);

  if (!data) return null;

  return (
    <section className="container">
      <h3>{data.title}</h3>
      <p>{data.content}</p>
    </section>
  );
};

export default NewsById;
