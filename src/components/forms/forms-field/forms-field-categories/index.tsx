/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { normalizeCategory } from "@/src/helpers/normalize-category";
import type { NewsFormData } from "@/src/helpers/zod";
import { useCategories } from "@/src/hooks/use-categories";
import { useModal } from "@/src/hooks/use-modal";
import type { ICategories } from "@/src/types/categories";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import styles from "./styles.module.css";

export const FormsFieldCategories = ({
  setShowCategories,
}: {
  setShowCategories: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { categories: categoriesList } = useCategories();
  const { control, setValue } = useFormContext<NewsFormData>();
  const { setRef, setModal } = useModal();
  const [isSearching, setIsSearching] = React.useState(false);
  const pathname = usePathname();
  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  React.useEffect(() => {
    setIsSearching(true);

    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const search = normalizeCategory(selectedCategory ?? "");

  const matchingCategories =
    categoriesList?.filter((category) =>
      normalizeCategory(category.title).includes(search),
    ) ?? [];

  const visibleCategories =
    !categoriesList || search.length < 3 || matchingCategories.length === 0
      ? (categoriesList ?? [])
      : matchingCategories;

  const handleDelete = async (category: ICategories) => {
    setRef({ ...category, action: "category-delete" });
    setModal(true);
  };

  const handleEditCategory = (category: ICategories) => {
    setRef({ ...category, action: "category-edit" });
    setModal(true);
  };

  const handleSelect = (category: ICategories) => {
    setValue("category", category.title, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setShowCategories(false);
  };

  return (
    <nav className={styles.formsCategoriesList}>
      <ul>
        {isSearching && (
          <li className={styles.formsCategoriesListEmpty}>Carregando...</li>
        )}

        {!isSearching && visibleCategories?.length === 0 && (
          <li className={styles.formsCategoriesListEmpty}>
            Nenhuma categoria encontrada.
          </li>
        )}

        {!isSearching &&
          visibleCategories.length > 0 &&
          visibleCategories.map((category) => {
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

                {pathname.startsWith("/editar-noticia") && (
                  <div className={styles.formsCategoriesListActions}>
                    <button
                      type="button"
                      onClick={() => handleDelete(category)}
                      title="Deletar categoria"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>

                    <button
                      type="button"
                      title="Editar categoria"
                      onClick={() => handleEditCategory(category)}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    </nav>
  );
};
