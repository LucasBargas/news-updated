"use client";

import { useModal } from "@/src/hooks/use-modal";
import { ICategories } from "@/src/types/categories";
import { INews } from "@/src/types/news";
import { ModalBody } from "./modal-body";
import { ModalDeleteCategory } from "./modal-delete-category";
import { ModalDeleteNews } from "./modal-delete-news";
import { ModalEditCategory } from "./modal-edit-category";

export const Modal = () => {
  const { modal, setModal, ref } = useModal();
  const closeModal = () => setModal(false);

  const renderContent = () => {
    switch (ref?.action) {
      case "news-delete":
        return <ModalDeleteNews newsRef={ref as INews} onClose={closeModal} />;
      case "category-delete":
        return (
          <ModalDeleteCategory
            categoryRef={ref as ICategories}
            onClose={closeModal}
          />
        );
      case "category-edit":
        return (
          <ModalEditCategory
            categoryRef={ref as ICategories}
            onClose={closeModal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ModalBody isOpen={modal} onClose={closeModal}>
      {renderContent()}
    </ModalBody>
  );
};
