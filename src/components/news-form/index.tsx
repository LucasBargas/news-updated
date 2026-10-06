"use client";

import { INews } from "@/src/actions/get-news-list";
import postNews from "@/src/actions/post-news";
import { updateNews } from "@/src/actions/update-news";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { newsFormSchema, type NewsFormData } from "../../helpers/zod";
import styles from "./styles.module.css";

interface NewsProps {
  singleData?: INews;
}

export const NewsForm = ({ singleData }: NewsProps) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: singleData?.title ?? "",
      content: singleData?.content ?? "",
      category: singleData?.category ?? "",
      author: singleData?.author ?? "",
    },
  });

  const onSubmit = async (data: NewsFormData) => {
    let news: INews | null = null;

    if (singleData && singleData.id) {
      news = await updateNews(singleData.id, data);
    } else {
      news = await postNews(data);
    }

    if (news && news.id) {
      router.push(`/noticia/${news.id}`);
    } else {
      console.error(
        "Erro ao salvar a notícia. Nenhuma informação retornou da API.",
      );
    }
  };

  return (
    <React.Fragment>
      <div className={styles.formsHeader}>
        <span></span>
        <h1>{singleData ? "Atualize a notícia" : "Cadastre uma notícia"}</h1>
        <p>Após o cadastro, a notícia estará disponível para todos.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formsArea}>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            placeholder="Defina o título da notícia"
            {...register("title")}
          />
          {errors.title && (
            <span className={styles.formsAreaError}>
              {errors.title.message}
            </span>
          )}

          <label htmlFor="content">Conteúdo:</label>
          <textarea
            id="content"
            placeholder="Defina o texto da notícia"
            rows={4}
            {...register("content")}
          ></textarea>
          {errors.content && (
            <span className={styles.formsAreaError}>
              {errors.content.message}
            </span>
          )}

          <label htmlFor="category">Categoria:</label>
          <input
            type="text"
            id="category"
            placeholder="Digite uma categoria ou escolha uma das existentes"
            {...register("category")}
          />
          {errors.category && (
            <span className={styles.formsAreaError}>
              {errors.category.message}
            </span>
          )}

          <label htmlFor="author">Autor:</label>
          <input
            type="text"
            id="author"
            placeholder="Defina o autor da notícia"
            {...register("author")}
          />
          {errors.author && (
            <span className={styles.formsAreaError}>
              {errors.author.message}
            </span>
          )}
        </div>

        <div className={styles.formsAreaButton}>
          <button type="submit">
            <span>{singleData ? "Atualizar" : "Cadastrar"}</span>
            <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};
