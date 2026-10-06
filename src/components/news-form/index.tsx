"use client";

import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./styles.module.css";

export const NewsForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <div className={styles.formsHeader}>
        <span></span>
        <h1>Cadastre uma notícia</h1>
        <p>
          Após o cadastro, a notícia estará disponível para outras pessoas
          verem.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formsArea}>
          <label htmlFor="title">Título:</label>
          <input type="text" name="title" id="title" />
          <label htmlFor="content">Conteúdo:</label>
          <textarea name="content" id="content"></textarea>
          <label htmlFor="category">Categoria:</label>
          <input type="text" name="category" id="category" />
          <label htmlFor="author">Autor:</label>
          <input type="text" name="author" id="author" />
        </div>

        <div className={styles.formsAreaButton}>
          <button type="submit">
            <span>Cadastrar</span>
            <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};
