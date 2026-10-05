import styles from "./styles.module.css";

interface HeaderMobileButtonProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderMobileButton = ({
  active,
  setActive,
}: HeaderMobileButtonProps) => {
  return (
    <button
      className={`${styles.headerMobileBtn} ${active ? styles.active : ""}`}
      onClick={() => setActive(!active)}
    >
      <span></span>
    </button>
  );
};
