"use server";

import { INews } from "../types/news";

const updateNews = async (id: number | string, updatedData: INews) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );
  }

  const endpoint = `${supabaseUrl}/rest/v1/news?id=eq.${id}`;

  try {
    const res = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error(`Erro ao atualizar a notícia: ${res.statusText}`);
    }

    const data = (await res.json()) as INews[];

    return data[0] as INews;
  } catch (error) {
    console.error(`Erro na requisição updateNews para o id ${id}:`, error);
    return null;
  }
};

export default updateNews;
