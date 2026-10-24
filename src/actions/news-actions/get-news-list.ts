"use server";

import { keys } from "@/src/helpers/keys";
import { INews } from "../../types/news";

export type OrderOption = "recent" | "oldest" | "random";

const getNewsList = async (
  searchTerm?: string,
  orderBy: OrderOption = "recent",
  favoritesOnly: boolean = false,
) => {
  const { supabaseUrl, supabaseKey } = keys;

  if (!supabaseUrl || !supabaseKey)
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );

  let endpoint = `${supabaseUrl}/rest/v1/news?select=*`;

  if (favoritesOnly) endpoint += "&isFavorite=eq.true";

  if (searchTerm) {
    const trimmedTerm = searchTerm.trim();

    const conditions = [
      `title.ilike.*${trimmedTerm}*`,
      `content.ilike.*${trimmedTerm}*`,
      `author.ilike.*${trimmedTerm}*`,
      `category.ilike.*${trimmedTerm}*`,
      `categorySlug.ilike.*${trimmedTerm}*`,
    ].join(",");

    endpoint += `&or=(${conditions})`;
  }

  if (orderBy === "recent") endpoint += "&order=created_at.desc";
  else if (orderBy === "oldest") endpoint += "&order=created_at.asc";

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      cache: "no-store",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`Erro ao buscar notícias: ${res.statusText}`);

    let data = (await res.json()) as INews[];

    if (orderBy === "random") data = data.sort(() => Math.random() - 0.5);

    return data;
  } catch (error) {
    console.error("Erro na requisição getNewsList:", error);
    return null;
  }
};

export default getNewsList;
