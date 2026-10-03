import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

interface HeaderNavProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderNav = ({ setActive }: HeaderNavProps) => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link
            href="/"
            onClick={() => setActive(false)}
            className={pathname === "/" ? styles.active : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/noticias-favoritas"
            onClick={() => setActive(false)}
            className={pathname === "/noticias-favoritas" ? styles.active : ""}
          >
            Notícias favoritas
          </Link>
        </li>
        <li>
          <Link
            href="/cadastrar-noticia"
            onClick={() => setActive(false)}
            className={pathname === "/cadastrar-noticia" ? styles.active : ""}
          >
            Cadastrar notícia
          </Link>
        </li>
      </ul>
    </nav>
  );
};
