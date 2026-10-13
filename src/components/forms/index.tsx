"use client";

import postNews from "@/src/actions/post-news";
import updateNews from "@/src/actions/update-news";
import { formConfig } from "@/src/helpers/form-config";
import { INews } from "@/src/types/news";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { newsFormSchema, type NewsFormData } from "../../helpers/zod";
import { FormsFavorite } from "./forms-favorite";
import { FormsField } from "./forms-field";
import styles from "./styles.module.css";

export const Forms = ({ singleData }: { singleData?: INews }) => {
  const [isFavorite, setIsFavorite] = React.useState(
    singleData?.isFavorite ?? false,
  );
  const router = useRouter();

  const methods = useForm<NewsFormData>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: singleData?.title ?? "",
      content: singleData?.content ?? "",
      category: singleData?.category ?? "",
      author: singleData?.author ?? "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

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

    router.push(`/noticia/${news?.id}`);
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

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formsArea}>
            {formConfig.map((field) => (
              <FormsField
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                as={field.as}
                rows={field.rows}
                errors={errors}
                errorMessage={errors[field.name]?.message}
                {...register(field.name)}
              />
            ))}
          </div>

          <div className={styles.formsAreaButton}>
            <button type="submit">
              <span>{singleData ? "Atualizar" : "Cadastrar"}</span>
              <FontAwesomeIcon icon={faArrowRightLong} />
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
