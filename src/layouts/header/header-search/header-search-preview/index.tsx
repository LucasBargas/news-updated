import { INews } from "@/src/actions/get-news";
import Link from "next/link";
import styles from "./styles.module.css";

interface HeaderSearchPreviewProps {
  news: null | INews[];
  isLoading: boolean;
  value: string;
  handleClick: () => void;
}

export const HeaderSearchPreview = ({
  news,
  isLoading,
  value,
  handleClick,
}: HeaderSearchPreviewProps) => {
  const renderContent = () => {
    if (isLoading) {
      return <li className={styles.noPreview}>Carregando...</li>;
    }

    if (news && news.length > 0) {
      return news.map((el) => (
        <li key={el.id}>
          <Link href={`/noticia/${el.id}`} onClick={handleClick}>
            {el.title}
          </Link>
        </li>
      ));
    }

    return (
      <li className={styles.noPreview}>
        Nenhuma notícia encontrada com: {value}
      </li>
    );
  };

  return (
    <nav>
      <ul className={styles.preview}>{renderContent()}</ul>
    </nav>
  );
};
