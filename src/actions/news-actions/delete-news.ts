"use server";

import { INews } from "@/src/types/news";
import { revalidatePath } from "next/cache";
import deleteCategories from "../categories-actions/delete-categories";
import getCategoriesList from "../categories-actions/get-categories-list";
import getNewsList from "./get-news-list";

const deleteNews = async (news: INews) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );
  }

  if (!news.id) {
    throw new Error("ID da notícia não informado.");
  }

  const endpoint = `${supabaseUrl}/rest/v1/news?id=eq.${news.id}`;

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
      throw new Error(`Erro ao deletar notícia: ${res.statusText}`);
    }

    const count = (await getNewsList(news.category))?.length ?? 0;

    if (count === 0) {
      const categories = await getCategoriesList();
      const category = categories?.find((item) => item.title === news.category);

      if (category) await deleteCategories(category);
    }

    revalidatePath("/home");
  } catch (error) {
    console.error(`Erro na requisição deleteNews para o id ${news.id}:`, error);
    throw error;
  }
};

export default deleteNews;
