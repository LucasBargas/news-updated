import { NewsOrderProvider } from "@/src/hooks/use-news-order";
import { OrderControl } from "@/src/layouts/order-control";
import { PageHeader } from "@/src/layouts/page-header";
import { Sidebar } from "@/src/layouts/sidebar";
import styles from "./layout.module.css";

export default function SideBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NewsOrderProvider>
      <div className="container">
        <div className={styles.defaultPage}>
          <PageHeader />
          <OrderControl />
          <Sidebar />
          <main>{children}</main>
        </div>
      </div>
    </NewsOrderProvider>
  );
}
