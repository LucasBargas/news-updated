import { Header } from "@/src/layouts/header";
import type { Metadata } from "next";
import { CategoriesProvider } from "../hooks/use-categories";
import { ModalProvider } from "../hooks/use-modal";
import { NewsProvider } from "../hooks/use-news";
import { NewsOrderProvider } from "../hooks/use-news-order";
import { Footer } from "../layouts/footer";
import { Modal } from "../layouts/modal";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "NewsLBS",
  description:
    "Notícias que conectam informação, contexto e pessoas. Desenvolvido por Lucas Bargas com base em uma referência visual e codificação própria.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-br">
      <body>
        <NewsProvider>
          <NewsOrderProvider>
            <CategoriesProvider>
              <ModalProvider>
                <div className="app-area">
                  <Header />
                  <main>{children}</main>
                  <Footer />
                  <Modal />
                </div>
              </ModalProvider>
            </CategoriesProvider>
          </NewsOrderProvider>
        </NewsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
