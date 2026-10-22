import updateCategories from "@/src/actions/categories-actions/update-categories";
import { useCategories } from "@/src/hooks/use-categories";
import type { ICategories } from "@/src/types/categories";
import { ModalActions } from "../modal-actions";
import { ModalHeader } from "../modal-header";
import styles from "./styles.module.css";

export const ModalEditCategory = (props: {
  categoryRef: ICategories;
  onClose: () => void;
}) => {
  const { setCategories } = useCategories();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("category")?.toString() ?? "";

    try {
      await updateCategories(props.categoryRef.id, title);
      setCategories(
        (prev) =>
          prev?.map((cat) =>
            cat.id === props.categoryRef.id ? { ...cat, title } : cat,
          ) ?? [],
      );
      props.onClose();
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
    }
  };

  return (
    <form onSubmit={handleEdit} className={styles.modalEditCategoryForm}>
      <ModalHeader
        title={`Você tem certeza que deseja editar a categoria: "${props.categoryRef?.title}"?`}
      />

      <input
        type="text"
        name="category"
        required
        placeholder="Edite a categoria..."
      />

      <ModalActions onClose={props.onClose} />
    </form>
  );
};
