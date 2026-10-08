import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

interface HeaderNavProps {
  handleClick: () => void;
}

export const HeaderNav = ({ handleClick }: HeaderNavProps) => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link
            href="/home"
            onClick={handleClick}
            className={pathname === "/" ? styles.active : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/noticias-favoritas"
            onClick={handleClick}
            className={pathname === "/noticias-favoritas" ? styles.active : ""}
          >
            Notícias favoritas
          </Link>
        </li>
        <li>
          <Link
            href="/cadastrar-noticia"
            onClick={handleClick}
            className={pathname === "/cadastrar-noticia" ? styles.active : ""}
          >
            Cadastrar notícia
          </Link>
        </li>
      </ul>
    </nav>
  );
};
