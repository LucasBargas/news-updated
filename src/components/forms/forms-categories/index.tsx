"use client";

import getCategoriesList from "@/src/actions/categories-list";
import { ICategories } from "@/src/types/categories";
import React from "react";
import styles from "./styles.module.css";
// Assumindo que você tem essa tipagem acessível aqui também

export const FormCategories = () => {
  // 1. Adicionada a tipagem do TypeScript para o estado
  const [categories, setCategories] = React.useState<ICategories[] | null>(
    null,
  );

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
              <button type="button">Apagar</button>
            </li>
          ))
        )}
      </ul>
    </nav>
  );
};
