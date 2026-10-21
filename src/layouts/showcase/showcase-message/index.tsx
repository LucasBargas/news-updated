import { useCategories } from "@/src/hooks/use-categories";
import { useParams } from "next/navigation";
import React from "react";
import { ShowcaseMessageBody } from "../showcase-message-body";

interface IShowcaseMessageProps {
  isFavoritePage: boolean;
  pathname: string;
}

export const ShowcaseMessage = (props: IShowcaseMessageProps) => {
  const { categories } = useCategories();
  const params = useParams();
  const categoriesFiltered = categories?.find(
    (el) => el.categorySlug === params.category,
  );

  React.useEffect(() => {
    console.log(categoriesFiltered);
  }, [categoriesFiltered]);

  if (props.isFavoritePage) {
    return (
      <div>
        {props.pathname === "/noticias-favoritas" ? (
          <ShowcaseMessageBody
            alert="Oops! Não há notícias cadastradas/favoritadas."
            message="Que tal favoritar a primeira?"
            href="/"
          />
        ) : (
          <ShowcaseMessageBody
            alert={`Oops! Não há notícias favoritadas nesta categoria: "${categoriesFiltered?.title}".`}
            message="Que tal favoritar a primeira?"
            href={`/home/${categoriesFiltered?.categorySlug}`}
          />
        )}
      </div>
    );
  }

  return (
    <ShowcaseMessageBody
      alert={`Oops! Ainda não há notícias cadastradas.`}
      message="Que tal cadastrar a primeira?"
      href="/cadastrar-noticia"
    />
  );
};
