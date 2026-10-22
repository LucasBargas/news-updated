import deleteNews from "@/src/actions/news-actions/delete-news";
import { useCategories } from "@/src/hooks/use-categories";
import { useNews } from "@/src/hooks/use-news";
import type { INews } from "@/src/types/news";
import { usePathname, useRouter } from "next/navigation";
import { ModalActions } from "../modal-actions";
import { ModalHeader } from "../modal-header";

export const ModalDeleteNews = (props: {
  newsRef: INews;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setNews, news, setIsLoading } = useNews();
  const { setCategories } = useCategories();
  const isSearchPage = pathname.startsWith("/pesquisa");
  const isFavoritePage = pathname.startsWith("/noticias-favoritas");

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await deleteNews(props.newsRef);

      if (pathname.startsWith("/noticia") && !isFavoritePage)
        router.push("/home");

      const remainingInSameCategory = news?.filter(
        (item) =>
          item.categorySlug === props.newsRef.categorySlug &&
          item.id !== props.newsRef.id,
      );

      if (remainingInSameCategory?.length === 0) {
        setCategories((prev) =>
          (prev ?? []).filter((el) => el.title !== props.newsRef.category),
        );
        if (!isSearchPage)
          router.push(isFavoritePage ? "/noticias-favoritas" : "/home");
      }

      setNews(
        (prev) => prev?.filter((item) => item.id !== props.newsRef.id) ?? [],
      );
      props.onClose();
    } catch (error) {
      console.error("Erro ao deletar notícia:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <ModalHeader
        title="Você tem certeza que deseja deletar esta notícia?"
        description="A notícia deletada não poderá ser recuperada."
      />

      <ModalActions onClose={props.onClose} />
    </form>
  );
};
