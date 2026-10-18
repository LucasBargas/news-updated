"use client";

import { PageHeader } from "@/src/components/page-header";
import { CategoriesProvider } from "@/src/hooks/use-categories";
import { NewsProvider } from "@/src/hooks/use-news";
import { NewsOrderProvider } from "@/src/hooks/use-news-order";
import { OrderControl } from "@/src/layouts/order-control";
import { Sidebar } from "@/src/layouts/sidebar";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";

export default function SideBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSearchPage = pathname.startsWith("/pesquisa");

  return (
    <NewsProvider>
      <NewsOrderProvider>
        <CategoriesProvider>
          <div className="container">
            <div className={styles.defaultPage}>
              <div className={styles.headerArea}>
                <PageHeader />
              </div>

              <div className={styles.orderArea}>
                <OrderControl />
              </div>

              {!isSearchPage && (
                <div className={styles.sidebarArea}>
                  <Sidebar />
                </div>
              )}

              <main
                className={isSearchPage ? styles.mainAreaFull : styles.mainArea}
              >
                {children}
              </main>
            </div>
          </div>
        </CategoriesProvider>
      </NewsOrderProvider>
    </NewsProvider>
  );
}
