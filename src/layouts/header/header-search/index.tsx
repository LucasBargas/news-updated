import getNews, { INews } from "@/src/actions/get-news";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { HeaderSearchPreview } from "./header-search-preview";
import styles from "./styles.module.css";

interface HeaderSearchProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
}

export const HeaderSearch = (props: HeaderSearchProps) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [news, setNews] = React.useState<null | INews[]>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const clearInput = () => {
    props.setValue("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const search = props.value.trim();

    if (!search) {
      clearInput();
      return;
    }

    setIsOpen(false);
    router.push(`pesquisa?q=${search}`);
    clearInput();
    props.handleClick();
  };

  React.useEffect(() => {
    const fetchNews = async () => {
      if (props.value.trim().length < 2) {
        setNews(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setIsOpen(true);

      try {
        const data = await getNews(props.value);
        setNews(data);
      } catch (error) {
        console.error("Erro ao buscar:", error);
        setNews([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchNews();
    }, 300);

    return () => clearTimeout(timer);
  }, [props]);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Pesquise por uma notícia"
        name="search"
        value={props.value}
        onChange={(e) => {
          props.setValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (props.value.trim().length > 2) setIsOpen(true);
        }}
      />
      <div className={styles.formActions}>
        {props.value.length > 2 && (
          <button type="button" onClick={clearInput}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}

        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {isOpen && props.value.length > 2 && (
        <HeaderSearchPreview
          news={news}
          isLoading={isLoading}
          value={props.value}
          handleClick={props.handleClick}
        />
      )}
    </form>
  );
};
