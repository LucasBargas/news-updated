import Link from "next/link";
import styles from "./styles.module.css";

interface HeaderLogoProps {
  handleClick?: () => void;
}

export const HeaderLogo = ({ handleClick }: HeaderLogoProps) => {
  return (
    <Link href="/" className={styles.logo} onClick={handleClick}>
      NewsLBS
    </Link>
  );
};
