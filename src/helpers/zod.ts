import { z } from "zod";

export const newsFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "O título é obrigatório.")
    .min(5, "O título deve ter no mínimo 5 caracteres."),
  content: z
    .string()
    .trim()
    .min(1, "O conteúdo é obrigatório.")
    .min(30, "O conteúdo deve ter no mínimo 30 caracteres."),
  category: z
    .string()
    .trim()
    .min(1, "A categoria é obrigatória.")
    .min(2, "A categoria deve ter no mínimo 2 caracteres."),
  author: z
    .string()
    .trim()
    .min(1, "O autor é obrigatório.")
    .min(3, "O nome do autor deve ter no mínimo 3 caracteres."),
});

export type NewsFormData = z.infer<typeof newsFormSchema>;
