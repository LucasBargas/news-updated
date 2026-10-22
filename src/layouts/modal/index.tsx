"use client";

import deleteCategories from "@/src/actions/categories-actions/delete-categories";
import updateCategories from "@/src/actions/categories-actions/update-categories";
import deleteNews from "@/src/actions/news-actions/delete-news";
import { useCategories } from "@/src/hooks/use-categories";
import { useModal } from "@/src/hooks/use-modal";
import { useNews } from "@/src/hooks/use-news";
import type { ICategories } from "@/src/types/categories";
import { INews } from "@/src/types/news";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const handleCloseModal = ({
    target,
    currentTarget,
  }: ReactMouseEvent<HTMLElement>) => {
    if (target === currentTarget) setModal(false);
  };

  const removeNewsAPI = async () => {
    setIsLoading(true);

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

    if (pathname.startsWith("/noticia") && !isFavoritePage)
      router.push("/home");

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
  };

  const deleteCategoryByRef = async () => {
    try {
      await deleteCategories(categoryRef);
      setCategories(
        (currentCategories) =>
          currentCategories &&
          currentCategories.filter((el) => el.id !== categoryRef.id),
      );
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      setCategories((currentCategories) => currentCategories ?? []);
    }
  };

  const editCategoryByRef = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("category")?.toString() ?? "";

    try {
      await updateCategories(categoryRef.id, title);

      setCategories((currentCategories) => {
        if (!currentCategories) return [];
        return currentCategories.map((cat) =>
          cat.id === categoryRef.id ? { ...cat, title } : cat,
        );
      });

      form.reset();
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      switch (ref?.action) {
        case "news-delete":
          await deleteNewsByRef();
          setModal(false);
          break;

        case "category-delete":
          await deleteCategoryByRef();
          setModal(false);
          break;

        case "category-edit":
          await editCategoryByRef(e);
          setModal(false);
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
        <div className={styles.modalClose}>
          <button type="button" onClick={() => setModal(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <h3>
          {ref?.action === "category-edit" &&
            `Você tem certeza que deseja editar a categoria: ${categoryRef?.title}?`}
          {ref?.action === "category-delete" &&
            `Você tem certeza que deseja deletar a categoria: ${categoryRef?.title}?`}
          {ref?.action === "news-delete" &&
            `Você tem certeza que deseja deletar esta notícia?`}
        </h3>

        <p>
          {ref?.action === "category-delete" &&
            `A categoria deletada não poderá ser recuperada e todas as notícias associadas a ela também serão deletadas.`}
          {ref?.action === "news-delete" &&
            `A notícia deletada não poderá ser recuperada.`}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type={ref?.action === "category-edit" ? "text" : "hidden"}
            name="category"
            id="category"
            placeholder="Edite a categoria..."
          />
          <div className={styles.modalActions}>
            <button type="submit">Confirmar</button>
            <button type="button" onClick={() => setModal(false)}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
