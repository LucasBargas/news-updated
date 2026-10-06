"use server";

export interface INewsInput {
  title: string;
  content: string;
  category: string;
  author: string;
}

const postNews = async (newsData: INewsInput) => {
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

    return data[0];
  } catch (error) {
    console.error("Erro na requisição postNews:", error);
    throw error;
  }
};

export default postNews;
