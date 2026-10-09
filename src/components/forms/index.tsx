"use client";

import postNews from "@/src/actions/post-news";
import updateNews from "@/src/actions/update-news";
import { INews } from "@/src/types/news";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { newsFormSchema, type NewsFormData } from "../../helpers/zod";
import { FormsFavorite } from "./forms-favorite";
import { FormsField } from "./forms-field";
import styles from "./styles.module.css";

export const Forms = ({ singleData }: { singleData?: INews }) => {
  const [isFavorite, setIsFavorite] = React.useState(singleData?.isFavorite);
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

    if (singleData?.id) {
      news = await updateNews(singleData.id, {
        ...data,
        isFavorite,
      });
    } else {
      news = await postNews(data);
    }

    // post/edit categorites

    if (news?.id) {
      router.push(`/noticia/${news.id}`);
    } else {
      console.error(
        "Erro ao salvar a notícia. Nenhuma informação retornou da API.",
      );
    }
  };

  return (
    <div className={styles.formsWrapper}>
      <div className={styles.formsHeader}>
        <span></span>
        <h1>{singleData ? "Atualize a notícia" : "Cadastre uma notícia"}</h1>
        <p>Após o cadastro, a notícia estará disponível para todos.</p>

        {singleData && (
          <FormsFavorite
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
          />
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formsArea}>
          <FormsField
            errors={errors}
            errorMessage={errors.title?.message}
            label="Título:"
            placeholder="Defina o título da notícia"
            {...register("title")}
          />

          <FormsField
            errors={errors}
            errorMessage={errors.content?.message}
            label="Conteúdo:"
            placeholder="Defina o texto da notícia"
            as="textarea"
            rows={4}
            {...register("content")}
          />

          <FormsField
            errors={errors}
            errorMessage={errors.category?.message}
            label="Categoria:"
            placeholder="Defina uma categoria ou escolha uma das extistentes"
            {...register("category")}
          />

          <FormsField
            errors={errors}
            errorMessage={errors.author?.message}
            label="Autor:"
            placeholder="Defina o autor da notícia"
            {...register("author")}
          />
        </div>

        <div className={styles.formsAreaButton}>
          <button type="submit">
            <span>{singleData ? "Atualizar" : "Cadastrar"}</span>
            <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>
      </form>
    </div>
  );
};
