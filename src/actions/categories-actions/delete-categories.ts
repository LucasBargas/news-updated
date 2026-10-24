"use server";

import { keys } from "@/src/helpers/keys";
import { ICategories } from "@/src/types/categories";
import { revalidatePath } from "next/cache";
import deleteNews from "../news-actions/delete-news";
import getNewsList from "../news-actions/get-news-list";

const deleteCategories = async (category: ICategories) => {
  const { supabaseUrl, supabaseKey } = keys;

  if (!supabaseUrl || !supabaseKey)
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );

  const endpoint = `${supabaseUrl}/rest/v1/categories?id=eq.${category.id}`;

  try {
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Erro do Supabase (${res.status}):`, errorText);
      throw new Error(`Erro ao deletar categoria: ${res.statusText}`);
    }

    const news = await getNewsList(category.title);

    news?.forEach(async (el) => {
      await deleteNews(el);
    });

    revalidatePath("/home");
  } catch (error) {
    console.error(
      `Erro na requisição deleteCategories para o id ${category.id}:`,
      error,
    );
    throw error;
  }
};

export default deleteCategories;
