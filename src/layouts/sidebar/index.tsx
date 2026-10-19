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
          <li>
            <Link
              href={href}
              className={pathname === href ? styles.active : ""}
            >
              Todas
            </Link>
          </li>
          {categories.map((el) => {
            return (
              <li key={el.id}>
                <Link
                  href={getCategory(el.categorySlug!).categoryHref}
                  className={
                    getCategory(el.categorySlug!).isActive ? styles.active : ""
                  }
                >
                  {el.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {categories.length === 1 && (
        <Link href="/cadastrar-noticia">
          Clique aqui e cadastre uma notícia e uma categoria
        </Link>
      )}
    </aside>
  );
};
