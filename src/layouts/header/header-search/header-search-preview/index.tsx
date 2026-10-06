import { INews } from "@/src/actions/get-news";
import Link from "next/link";
import styles from "./styles.module.css";

interface HeaderSearchPreviewProps {
  news: null | INews[];
  isLoading: boolean;
  value: string;
  handleClick: () => void;
}

export const HeaderSearchPreview = (props: HeaderSearchPreviewProps) => {
  const renderContent = () => {
    if (props.isLoading) {
      return <li className={styles.noPreview}>Carregando...</li>;
    }

    if (props.news && props.news.length > 0) {
      return props.news.map((el) => (
        <li key={el.id}>
          <Link href={`/noticia/${el.id}`} onClick={props.handleClick}>
            {el.title}
          </Link>
        </li>
      ));
    }

    return (
      <li className={styles.noPreview}>
        Nenhuma notícia encontrada com: {props.value}
      </li>
    );
  };

  return (
    <nav>
      <ul className={styles.preview}>{renderContent()}</ul>
    </nav>
  );
};
