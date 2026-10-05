import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import styles from "./styles.module.css";

interface HeaderSearchProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
}

export const HeaderSearch = (props: HeaderSearchProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    props.setValue("");
    inputRef.current?.focus();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const search = props.value.trim();

    if (!search) {
      clearInput();
      return;
    }

    router.push(`pesquisa?q=${search}`);
    clearInput();
    props.handleClick();
  };

  React.useEffect(() => {
    if (!props.value) return;

    console.log(props.value);
  }, [props]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Pesquise por uma notícia"
        name="search"
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
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
    </form>
  );
};
