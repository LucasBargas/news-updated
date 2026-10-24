"use server";

import { keys } from "@/src/helpers/keys";
import { revalidatePath } from "next/cache";
import { INews } from "../../types/news";

const updateNews = async (
  id: number | string,
  updatedData: INews,
): Promise<INews | null> => {
  const { supabaseUrl, supabaseKey } = keys;

  if (!supabaseUrl || !supabaseKey)
    throw new Error(
      "As variáveis de ambiente do Supabase não estão configuradas.",
    );

  const endpoint = `${supabaseUrl}/rest/v1/news?id=eq.${id}`;

  try {
    const res = await fetch(endpoint, {
      method: "PATCH",
      cache: "no-store",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok)
      throw new Error(`Erro ao atualizar a notícia: ${res.statusText}`);

    const data = (await res.json()) as INews[];
    const updatedNews = data[0];

    if (!updatedNews) return null;

    revalidatePath(`/noticia/${id}`);
    revalidatePath(`/editar-noticia/${id}`);

    return updatedNews;
  } catch (error) {
    console.error(`Erro na requisição updateNews para o id ${id}:`, error);
    return null;
  }
};

export default updateNews;
