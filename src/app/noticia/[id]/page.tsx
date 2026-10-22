import getNewsId from "@/src/actions/news-actions/get-news-id";
import { Article } from "@/src/components/article";
import { ArticleActions } from "@/src/components/article/article-actions";
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

  try {
    const data = await getNewsId(id);

    if (!data) {
      return {
        title: "Notícia não encontrada | NewsLBS",
        description: "Navegue por nossas notícias.",
      };
    }

    return {
      title: `NewsLBS | Notícia | ${id}`,
      description: `Confira a notícia que tem o tema ${data.title}. Fique atualizado conosco.`,
      keywords: [
        `${data.category}`,
        `${data.title}`,
        "notícia",
        "atualizações",
        "informações",
        "tendências",
        "assuntos diversos",
      ],
    };
  } catch (error) {
    console.error("Erro ao gerar metadados:", error);
    return {
      title: "Notícia não encontrada | NewsLBS",
      description: "Navegue por nossas notícias.",
      keywords: [
        "notícia",
        "atualizações",
        "informações",
        "tendências",
        "assuntos diversos",
      ],
    };
  }
};

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
