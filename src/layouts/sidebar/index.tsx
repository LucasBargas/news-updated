"use client";

import getCategoriesList from "@/src/actions/categories-actions/get-categories-list";
import { createSlug } from "@/src/helpers/create-slug";
import { ICategories } from "@/src/types/categories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Sidebar = () => {
  const pathname = usePathname();
  const [categories, setCategories] = React.useState<null | ICategories[]>(
    null,
  );

  const href = pathname.includes("/home") ? "/home" : "/noticias-favoritas";

  React.useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesList();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <aside>
      <h3>Navege por categoria:</h3>
      <nav>
        <ul>
          <li>
            <Link href={href}>Todas</Link>
          </li>
          {categories?.map((el) => (
            <li key={el.id}>
              <Link href={`${href}/${createSlug(el.title)}`}>{el.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
