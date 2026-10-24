"use server";

import { keys } from "@/src/helpers/keys";
import { ICategories } from "../../types/categories";

const getCategoriesList = async () => {
  const { supabaseUrl, supabaseKey } = keys;

  if (!supabaseUrl || !supabaseKey)
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );

  const endpoint = `${supabaseUrl}/rest/v1/categories?select=*&order=created_at.desc`;

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

    if (!res.ok)
      throw new Error(`Erro ao buscar categorias: ${res.statusText}`);

    const data = (await res.json()) as ICategories[];

    return data;
  } catch (error) {
    console.error("Erro na requisição getCategoriesList:", error);
    return null;
  }
};

export default getCategoriesList;
