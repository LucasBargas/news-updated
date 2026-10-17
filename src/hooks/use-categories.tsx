"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import getCategoriesList from "../actions/categories-actions/get-categories-list";

interface ICategory {
  id: string;
  title: string;
  categorySlug?: string;
}

interface CategoriesContextData {
  categories: ICategory[] | null;
  setCategories: React.Dispatch<React.SetStateAction<ICategory[] | null>>;
  isLoading: boolean;
}

const CategoriesContext = createContext<CategoriesContextData | undefined>(
  undefined,
);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const data = await getCategoriesList();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, [pathname]);

  return (
    <CategoriesContext.Provider
      value={{ categories, setCategories, isLoading }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error(
      "useCategories deve ser usado dentro de um CategoriesProvider",
    );
  }

  return context;
};
