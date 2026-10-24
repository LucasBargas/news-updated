"use server";

import { createSlug } from "@/src/helpers/create-slug";
import { keys } from "@/src/helpers/keys";

const postCategories = async (title: string) => {
  const { supabaseUrl, supabaseKey } = keys;

  if (!supabaseUrl || !supabaseKey)
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );

  const endpoint = `${supabaseUrl}/rest/v1/categories`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ title, categorySlug: createSlug(title) }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Erro do Supabase (${res.status}):`, errorText);
      throw new Error(`Erro ao postar categoria: ${res.statusText}`);
    }

    const data = await res.json();

    return data[0];
  } catch (error) {
    console.error("Erro na requisição postCategories:", error);
    throw error;
  }
};

export default postCategories;
