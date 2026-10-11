"use server";

import { revalidatePath } from "next/cache";

const deleteCategories = async (id: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );
  }

  const endpoint = `${supabaseUrl}/rest/v1/categories?id=eq.${id}`;

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

    revalidatePath("/home");
  } catch (error) {
    console.error(
      `Erro na requisição deleteCategories para o id ${id}:`,
      error,
    );
    throw error;
  }
};

export default deleteCategories;
