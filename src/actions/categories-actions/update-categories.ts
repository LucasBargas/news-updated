"use server";

import { createSlug } from "@/src/helpers/create-slug";
import getNewsList from "../news-actions/get-news-list";
import updateNews from "../news-actions/update-news";
import getCategoriesList from "./get-categories-list";

const updateCategories = async (id: string, newTitle: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey)
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );

  const categories = await getCategoriesList();
  const currentCategory = categories?.find(
    (cat) => cat.id.toString() === id.toString(),
  );
  const oldTitle = currentCategory?.title;
  const newSlug = createSlug(newTitle);
  const endpoint = `${supabaseUrl}/rest/v1/categories?id=eq.${id}`;

  try {
    const res = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ title: newTitle, categorySlug: newSlug }),
    });

    if (!res.ok)
      throw new Error(`Erro ao atualizar categoria: ${res.statusText}`);

    const data = await res.json();

    if (oldTitle) {
      const newsList = await getNewsList(oldTitle);

      if (newsList && newsList.length > 0) {
        await Promise.all(
          newsList.map(async (item) => {
            if (item.id === undefined) return;

            await updateNews(item.id, {
              ...item,
              category: newTitle,
              categorySlug: newSlug,
            });
          }),
        );
      }
    }

    return data[0];
  } catch (error) {
    console.error("Erro na requisição updateCategories:", error);
    throw error;
  }
};

export default updateCategories;
