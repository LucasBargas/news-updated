import getNewsList from "../../actions/news-actions/get-news-list";

const HomePage = async () => {
  const data = await getNewsList("", "random", false);

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

export default HomePage;
