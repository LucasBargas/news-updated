"use client";

import deleteCategories from "@/src/actions/delete-categories";
import getCategoriesList from "@/src/actions/get-categories-list";
import { ICategories } from "@/src/types/categories";
import React from "react";
import styles from "./styles.module.css";

export const FormsFieldCategories = () => {
  const [categories, setCategories] = React.useState<ICategories[] | null>(
    null,
  );

  const handleClick = async (id: string) => {
    setCategories((prev) => (prev ? prev.filter((el) => el.id !== id) : prev));
    await deleteCategories(id);
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesList();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <nav className={styles.formsCategoriesList}>
      <ul>
        {!categories ? (
          <li>Carregando categorias...</li>
        ) : categories.length === 0 ? (
          <li>Nenhuma categoria encontrada.</li>
        ) : (
          categories.map((category) => (
            <li key={category.id}>
              <span>{category.title}</span>{" "}
              <button type="button" onClick={() => handleClick(category.id)}>
                Apagar
              </button>
            </li>
          ))
        )}
      </ul>
    </nav>
  );
};
