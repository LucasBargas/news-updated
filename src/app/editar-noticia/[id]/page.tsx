import getNewsId from "@/src/actions/get-news-id";
import { NewsForm } from "@/src/components/news-form";
import styles from "./styles.module.css";

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
    <section className={`container ${styles.editArea}`}>
      <NewsForm singleData={data} />
    </section>
  );
};

export default EditNewsPage;
