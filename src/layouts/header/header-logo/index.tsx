import Link from "next/link";
import styles from "./styles.module.css";

interface HeaderLogoProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderLogo = ({ setActive }: HeaderLogoProps) => {
  return (
    <Link href="/" className={styles.logo} onClick={() => setActive(false)}>
      NewsLBS
    </Link>
  );
};
