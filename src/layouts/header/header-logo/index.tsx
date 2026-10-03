import Link from "next/link";
import styles from "./styles.module.css";

export const HeaderLogo = () => {
  return (
    <Link href="/" className={styles.logo}>
      NewsLBS
    </Link>
  );
};
