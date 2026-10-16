"use client";

import deleteCategories from "@/src/actions/categories-actions/delete-categories";
import { normalizeCategory } from "@/src/helpers/normalize-category";
import type { NewsFormData } from "@/src/helpers/zod";
import type { ICategories } from "@/src/types/categories";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import styles from "./styles.module.css";

interface FormsFieldCategoriesProps {
  setShowCategories: React.Dispatch<React.SetStateAction<boolean>>;
  categoriesList: ICategories[] | null;
}

export const FormsFieldCategories = (props: FormsFieldCategoriesProps) => {
  const { control, setValue } = useFormContext<NewsFormData>();
  const [categories, setCategories] = React.useState<ICategories[] | null>(
    props.categoriesList ?? null,
  );

  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  const search = normalizeCategory(selectedCategory ?? "");

  const matchingCategories =
    categories?.filter((category) =>
      normalizeCategory(category.title).includes(search),
    ) ?? [];

  const visibleCategories = (
    !categories || search.length < 3 || matchingCategories.length === 0
      ? (categories ?? [])
      : matchingCategories
  ).filter((category) => category.title.trim().toLowerCase() !== "todas");

  const handleDelete = async (id: string) => {
    await deleteCategories(id);

    setCategories((currentCategories) =>
      currentCategories
        ? currentCategories.filter((category) => category.id !== id)
        : currentCategories,
    );
  };

  const handleSelect = (category: ICategories) => {
    setValue("category", category.title, {
      shouldValidate: true,
      shouldDirty: true,
    });

    props.setShowCategories(false);
  };

  const isLoading = categories === null;
  const isEmpty = categories !== null && categories.length === 0;

  return (
    <nav className={styles.formsCategoriesList}>
      <ul>
        {isLoading && (
          <li className={styles.formsCategoriesListEmpty}>
            Carregando categorias...
          </li>
        )}

        {isEmpty && (
          <li className={styles.formsCategoriesListEmpty}>
            Nenhuma categoria encontrada.
          </li>
        )}

        {visibleCategories.map((category) => {
          const isSelected =
            normalizeCategory(selectedCategory ?? "") ===
            normalizeCategory(category.title);

          return (
            <li key={category.id}>
              <span
                onClick={() => handleSelect(category)}
                className={isSelected ? styles.active : ""}
              >
                {category.title}
              </span>

              <div className={styles.formsCategoriesListActions}>
                <button
                  type="button"
                  onClick={() => handleDelete(category.id)}
                  title="Deletar categoria"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>

                <button type="button" title="Editar categoria">
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
