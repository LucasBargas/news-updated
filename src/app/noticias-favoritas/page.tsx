import getNewsList from "@/src/actions/get-news-list";

const FavoritesNews = async () => {
  const data = await getNewsList("", "random", true);

  if (!data) return null;

  return (
    <div className="container">
      {data.map((el) => (
        <li key={el.id}>
          <h3>{el.title}</h3>
          <p>{el.content}</p>
        </li>
      ))}
    </div>
  );
};

export default FavoritesNews;
