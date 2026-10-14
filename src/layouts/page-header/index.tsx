"use client";

import { usePathname } from "next/navigation";

export const PageHeader = () => {
  const pathname = usePathname();

  let title = "NewsLBS";
  let description = "Acompanhe as últimas novidades";

  if (pathname.includes("/home")) {
    title = "Todas as notícias";
    description = "As melhores notícias estão disponíveis aqui!";
  } else {
    title = "Notícias favoritas";
    description = "Veja as notícias favoritadas por você.";
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};
