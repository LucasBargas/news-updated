"use server";

import { keys } from "@/src/helpers/keys";
import { INews } from "../../types/news";

const getNewsId = async (id: number | string): Promise<INews | null> => {
  const { supabaseUrl, supabaseKey } = keys;

  if (!supabaseUrl || !supabaseKey)
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );

  const endpoint = `${supabaseUrl}/rest/v1/news?select=*&id=eq.${id}`;

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

    if (!res.ok) throw new Error(`Erro ao buscar a notícia: ${res.statusText}`);

    const data = (await res.json()) as INews[];
    return data[0];
  } catch (error) {
    console.error(`Erro na requisição getNewsId para o id ${id}:`, error);
    return null;
  }
};

export default getNewsId;
