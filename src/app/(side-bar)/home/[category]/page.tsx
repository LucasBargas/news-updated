import { Showcase } from "@/src/components/showcase";

interface IPageParams {
  params: Promise<{
    category: string;
  }>;
}

const Categories = async ({ params }: IPageParams) => {
  const { category } = await params;

  return <Showcase param={category} />;
};

export default Categories;
