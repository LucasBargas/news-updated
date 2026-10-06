"use server";

import { INews } from "../types/news";

const getNewsId = async (id: number | string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );
  }

  // Usamos o parâmetro id=eq.${id} para filtrar exatamente o ID desejado
  const endpoint = `${supabaseUrl}/rest/v1/news?select=*&id=eq.${id}`;

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
      throw new Error(`Erro ao buscar a notícia: ${res.statusText}`);
    }

    const data = (await res.json()) as INews[];

    return data[0];
  } catch (error) {
    console.error(`Erro na requisição getNewsById para o id ${id}:`, error);
    return null;
  }
};

export default getNewsId;
