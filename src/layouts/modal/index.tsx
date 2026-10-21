"use client";

import deleteNews from "@/src/actions/news-actions/delete-news";
import { useCategories } from "@/src/hooks/use-categories";
import { useModal } from "@/src/hooks/use-modal";
import { useNews } from "@/src/hooks/use-news";
import type { ICategories } from "@/src/types/categories";
import { INews } from "@/src/types/news";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent as ReactMouseEvent } from "react";
import styles from "./styles.module.css";

export const Modal = () => {
  const pathname = usePathname();
  const isSearchPage = pathname.startsWith("/pesquisa");
  const isFavoritePage = pathname.startsWith("/noticias-favoritas");
  const router = useRouter();
  const { modal, setModal, ref } = useModal();
  const { setNews, news, setIsLoading } = useNews();
  const { setCategories } = useCategories();
  const newsRef = ref as INews;
  const categoryRef = ref as ICategories;

  const handleCloseModal = (event: ReactMouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      setModal(false);
    }
  };

  const removeNewsAPI = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    try {
      await deleteNews(newsRef);
      return true;
    } catch (error) {
      console.error("Erro ao deletar notícia:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNewsByRef = async () => {
    const success = await removeNewsAPI();
    if (!success) return;

    if (pathname.startsWith("/noticia")) router.push("/home");

    const remainingNewsInSameCategory = news?.filter(
      (item) =>
        item.categorySlug === newsRef.categorySlug && item.id !== newsRef.id,
    );

    const count = remainingNewsInSameCategory?.length ?? 0;

    if (count === 0) {
      setCategories((prev) => {
        return prev && prev.filter((el) => el.title !== newsRef.category);
      });

      if (!isSearchPage)
        router.push(isFavoritePage ? "/noticias-favoritas" : "/home");
    }

    setNews(
      (currentNews) =>
        currentNews?.filter((item) => item.id !== newsRef.id) ?? [],
    );

    setModal(false);
  };

  const deleteCategoryByRef = async () => {
    console.log("Deletar categoria:", ref as ICategories);
  };

  const editCategoryByRef = async () => {
    console.log("Editar categoria:", ref as ICategories);
  };

  const handleClick = async () => {
    try {
      switch (ref?.action) {
        case "news-delete":
          await deleteNewsByRef();
          break;

        case "category-delete":
          await deleteCategoryByRef();
          break;

        case "category-edit":
          await editCategoryByRef();
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Erro ao executar ação do modal:", error);
    }
  };

  return (
    <section
      className={`${styles.modalWrapper} ${modal ? styles.active : ""}`}
      onClick={handleCloseModal}
    >
      <div className={styles.modal}>
        <p>Olá</p>

        <button type="button" onClick={handleClick}>
          Confirmar
        </button>
      </div>
    </section>
  );
};
