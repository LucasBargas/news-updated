"use client";

import deleteCategories from "@/src/actions/delete-categories";
import getCategoriesList from "@/src/actions/get-categories-list";
import type { NewsFormData } from "@/src/helpers/zod";
import type { ICategories } from "@/src/types/categories";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import styles from "./styles.module.css";

interface FormsFieldCategoriesProps {
  setShowCategories: React.Dispatch<React.SetStateAction<boolean>>;
}

const normalizeCategory = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .toLocaleLowerCase("pt-BR");

export const FormsFieldCategories = ({
  setShowCategories,
}: FormsFieldCategoriesProps) => {
  const { control, setValue } = useFormContext<NewsFormData>();
  const [categories, setCategories] = React.useState<ICategories[] | null>(
    null,
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

  const visibleCategories =
    !categories || search.length < 3 || matchingCategories.length === 0
      ? (categories ?? [])
      : matchingCategories;

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

    setShowCategories(false);
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesList();
      setCategories(data);
    };

    fetchCategories();
  }, []);

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
                  title="Deletar categoria"
                  onClick={() => handleDelete(category.id)}
                >
                  Deletar
                </button>

                <button type="button" title="Editar categoria">
                  Editar
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
