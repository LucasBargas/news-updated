"use client";

import { useCategories } from "@/src/hooks/use-categories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

export const Sidebar = () => {
  const pathname = usePathname();
  const { categories } = useCategories();

  const href = pathname.includes("/home") ? "/home" : "/noticias-favoritas";

  const getCategory = (categorySlug: string) => {
    const categoryHref = `${href}/${categorySlug}`;
    const isActive = pathname === categoryHref;

    return { categoryHref, isActive };
  };
  if (!categories) return null;

  return (
    <aside className={styles.aside}>
      <h3>Navegue por categoria:</h3>
      <nav>
        <ul>
          {categories.map((el) => {
            return (
              <li key={el.id}>
                <Link
                  href={
                    el.title === "Todas"
                      ? href
                      : getCategory(el.categorySlug!).categoryHref
                  }
                  className={
                    el.title === "Todas"
                      ? pathname === href
                        ? styles.active
                        : ""
                      : getCategory(el.categorySlug!).isActive
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
