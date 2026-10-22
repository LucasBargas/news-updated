import { Forms } from "@/src/components/forms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NewsLBS | Cadastrar Notícia",
  description:
    "Cadastre suas notícias e atualizações sobre diversos assuntos. Mantenha-se informado com as últimas notícias e tendências do momento.",
  keywords: [
    "Lucas Bargas",
    "NewsLBS",
    "notícias",
    "atualizações",
    "informações",
    "tendências",
    "assuntos diversos",
  ],
};

const RegisterPage = async () => {
  return (
    <section className="container">
      <Forms />
    </section>
  );
};

export default RegisterPage;
