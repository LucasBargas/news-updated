import Link from "next/link";
import styles from "./styles.module.css";

export const ShowcaseMessageBody = ({
  alert,
  message,
  href,
}: {
  alert: string;
  message: string;
  href: string;
}) => {
  return (
    <div className={styles.messageArea}>
      <h2>404 :(</h2>
      <h3>{alert}</h3>
      <p>{message}</p>
      <Link href={href}>Clique aqui</Link>
    </div>
  );
};
