import deleteCategories from "@/src/actions/categories-actions/delete-categories";
import { useCategories } from "@/src/hooks/use-categories";
import type { ICategories } from "@/src/types/categories";
import type { FormEvent } from "react";
import { ModalActions } from "../modal-actions";
import { ModalHeader } from "../modal-header";

interface ModalDeleteCategoryProps {
  categoryRef: ICategories;
  onClose: () => void;
}

export const ModalDeleteCategory = (props: ModalDeleteCategoryProps) => {
  const { setCategories } = useCategories();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await deleteCategories(props.categoryRef);
      setCategories((currentCategories) => {
        if (!currentCategories) return [];
        return currentCategories.filter((el) => el.id !== props.categoryRef.id);
      });

      props.onClose();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      setCategories((currentCategories) => currentCategories ?? []);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <ModalHeader
        title={`Você tem certeza que deseja deletar a categoria: "${props.categoryRef?.title}"?`}
        description="A categoria deletada não poderá ser recuperada e todas as notícias associadas a ela também serão deletadas."
      />

      <ModalActions onClose={props.onClose} />
    </form>
  );
};
