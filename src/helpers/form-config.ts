import { NewsFormData } from "./zod"; // Ajuste o caminho do seu Zod se precisar

export interface IFormConfig {
  name: keyof NewsFormData;
  label: string;
  placeholder: string;
  as?: "input" | "textarea";
  rows?: number;
}

export const formConfig: IFormConfig[] = [
  {
    name: "title",
    label: "Título:",
    placeholder: "Defina o título da notícia",
  },
  {
    name: "content",
    label: "Conteúdo:",
    placeholder: "Defina o texto da notícia",
    as: "textarea",
    rows: 4,
  },
  {
    name: "category",
    label: "Categoria:",
    placeholder: "Defina uma categoria ou escolha uma das existentes",
  },
  {
    name: "author",
    label: "Autor:",
    placeholder: "Defina o autor da notícia",
  },
];
