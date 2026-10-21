import getNewsList from "@/src/actions/news-actions/get-news-list";
import { Showcase } from "@/src/layouts/showcase";

const HomePage = async () => {
  await getNewsList(); // loading activation

  return <Showcase />;
};

export default HomePage;
