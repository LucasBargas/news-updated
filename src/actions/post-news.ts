"use server";

import { INews } from "./get-news";

const postNews = async (newsData: INews) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );
  }

  const endpoint = `${supabaseUrl}/rest/v1/news`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(newsData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Erro do Supabase (${res.status}):`, errorText);
      throw new Error(`Erro ao postar notícia: ${res.statusText}`);
    }

    const data = await res.json();

    return {
      body: data[0] as INews,
      ok: res.ok,
    };
  } catch (error) {
    console.error("Erro na requisição postNews:", error);
    throw error;
  }
};

export default postNews;
