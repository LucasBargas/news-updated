"use client";

import React from "react";
import type { ICategories } from "../types/categories";
import type { INews } from "../types/news";

type ModalAction = "news-delete" | "category-delete" | "category-edit";

type ModalRef = (INews | ICategories) & {
  action: ModalAction;
};

interface ModalContextData {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  ref: ModalRef | null;
  setRef: React.Dispatch<React.SetStateAction<ModalRef | null>>;
  modalRef?: React.RefObject<HTMLElement | null>;
}

const ModalContext = React.createContext<ModalContextData | undefined>(
  undefined,
);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = React.useState(false);
  const [ref, setRef] = React.useState<ModalRef | null>(null);
  const modalRef = React.useRef<HTMLElement>(null);

  return (
    <ModalContext.Provider value={{ modal, setModal, ref, setRef, modalRef }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = React.useContext(ModalContext);

  if (!context) {
    throw new Error("useModal deve ser usado dentro de um ModalProvider");
  }

  return context;
};
