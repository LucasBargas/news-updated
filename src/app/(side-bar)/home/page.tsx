import getNewsList from "@/src/actions/news-actions/get-news-list";

const HomePage = async () => {
  const data = await getNewsList("", "random", false);

  if (!data) return null;

  return (
    <div>
      {data.map((el) => (
        <li key={el.id}>
          <h3>{el.title}</h3>
          <p>{el.content}</p>
        </li>
      ))}
    </div>
  );
};

export default HomePage;
