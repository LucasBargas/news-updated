"use client";

import getCategoriesList from "@/src/actions/categories-actions/get-categories-list";
import { ICategories } from "@/src/types/categories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./styles.module.css";

export const Sidebar = () => {
  const pathname = usePathname();
  const [categories, setCategories] = React.useState<null | ICategories[]>(
    null,
  );

  const href = pathname.includes("/home") ? "/home" : "/noticias-favoritas";

  const getCategory = (categorySlug: string) => {
    const categoryHref = `${href}/${categorySlug}`;
    const isActive = pathname === categoryHref;

    return { categoryHref, isActive };
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesList();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <aside className={styles.aside}>
      <h3>Navegue por categoria:</h3>
      <nav>
        <ul>
          <li></li>
          {categories?.map((el) => {
            return (
              <li key={el.id}>
                <Link
                  href={
                    el.title === "Todas"
                      ? href
                      : getCategory(el.categorySlug).categoryHref
                  }
                  className={
                    el.title === "Todas"
                      ? pathname === href
                        ? styles.active
                        : ""
                      : getCategory(el.categorySlug).isActive
                        ? styles.active
                        : ""
                  }
                >
                  {el.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
