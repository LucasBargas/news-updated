import getCategoriesList from "@/src/actions/categories-actions/get-categories-list";
import { Showcase } from "@/src/layouts/showcase";
import { ICategories } from "@/src/types/categories";
import { Metadata } from "next";

interface IPageParams {
  params: Promise<{
    category: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: IPageParams): Promise<Metadata> => {
  const { category } = await params;

  try {
    const categories = await getCategoriesList();
    const data: ICategories | undefined = categories?.find(
      (cat) => cat.categorySlug === category,
    );

    if (!data) {
      return {
        title: "Categoria não encontrada | NewsLBS",
        description: "Navegue por nossas categorias de notícias.",
      };
    }

    return {
      title: `NewsLBS | Home | ${data.title}`,
      description: `Confira as últimas notícias sobre ${data.title}. Fique atualizado com as informações mais recentes e relevantes da categoria ${data.title}.`,
      keywords: [data.title, "notícias", "atualizações", "informações"],
    };
  } catch (error) {
    console.error("Erro ao gerar metadados:", error);
    return {
      title: "Categoria não encontrada | NewsLBS",
      description: "Navegue por nossas categorias de notícias.",
    };
  }
};

const Categories = async ({ params }: IPageParams) => {
  const { category } = await params;

  return <Showcase param={category} />;
};

export default Categories;
