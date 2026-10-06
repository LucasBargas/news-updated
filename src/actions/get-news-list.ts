"use server";

import { INews } from "../types/news";

const getNewsList = async (searchTerm?: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );
  }

  let endpoint = `${supabaseUrl}/rest/v1/news?select=*`;
  if (searchTerm) {
    const trimmedTerm = searchTerm.trim();

    const conditions = [
      `title.ilike.*${trimmedTerm}*`,
      `content.ilike.*${trimmedTerm}*`,
      `author.ilike.*${trimmedTerm}*`,
      `category.ilike.*${trimmedTerm}*`,
    ].join(",");

    endpoint += `&or=(${conditions})`;
  }

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Erro ao buscar notícias: ${res.statusText}`);
    }

    const data = (await res.json()) as INews[];
    return data;
  } catch (error) {
    console.error("Erro na requisição getNews:", error);
    return null;
  }
};

export default getNewsList;
