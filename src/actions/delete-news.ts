"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const deleteNews = async (id: number | string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );
  }

  const endpoint = `${supabaseUrl}/rest/v1/news?id=eq.${id}`;

  let isDeleted = false;

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

    revalidatePath("/");

    isDeleted = true;
  } catch (error) {
    console.error(`Erro na requisição deleteNews para o id ${id}:`, error);
    throw error;
  }

  if (isDeleted) {
    redirect("/");
  }
};

export default deleteNews;
