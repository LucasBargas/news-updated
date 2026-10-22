import { useCategories } from "@/src/hooks/use-categories";
import { useModal } from "@/src/hooks/use-modal";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import type { FieldErrors } from "react-hook-form";
import { ErrorMessage } from "../../error-message";
import { FormsFieldCategories } from "./forms-field-categories";
import styles from "./styles.module.css";

type InputOrTextareaProps = React.ComponentProps<"input"> &
  React.ComponentProps<"textarea">;

interface FormsCategoriesProps extends InputOrTextareaProps {
  label: string;
  errors?: FieldErrors;
  errorMessage?: string;
  as?: "input" | "textarea";
}

export const FormsField = ({
  label,
  errors,
  errorMessage,
  as = "input",
  ...props
}: FormsCategoriesProps) => {
  const { categories } = useCategories();
  const [showCategories, setShowCategories] = React.useState(false);
  const fieldRef = React.useRef<HTMLDivElement>(null);
  const { modalRef } = useModal();

  const handleClick = () => {
    setShowCategories(!showCategories);
  };

  React.useEffect(() => {
    if (!showCategories) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        fieldRef.current &&
        !modalRef?.current?.contains(e.target as Node) &&
        !fieldRef.current.contains(e.target as Node)
      )
        setShowCategories(false);
    };

    const handleKeyDown = ({ key }: KeyboardEvent) =>
      key === "Escape" && setShowCategories(false);

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalRef, showCategories]);

  return (
    <React.Fragment>
      <label className={styles.label} htmlFor={props.name}>
        {label}
      </label>
      <div
        ref={fieldRef}
        className={`${styles.formsField} ${
          props.name === "category" ? styles.isRelative : ""
        }`}
      >
        {as === "textarea" ? (
          <textarea id={props.name} {...props} />
        ) : (
          <input
            type="text"
            id={props.name}
            {...props}
            onClick={() => {
              if (props.name === "category") {
                setShowCategories(true);
              }
            }}
          />
        )}

        {props.name === "category" && categories && categories.length > 0 && (
          <React.Fragment>
            <button
              type="button"
              onClick={handleClick}
              className={`${styles.formsFieldChevron} ${showCategories ? styles.active : ""}`}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>

            {showCategories && (
              <FormsFieldCategories setShowCategories={setShowCategories} />
            )}
          </React.Fragment>
        )}
      </div>

      {errors && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </React.Fragment>
  );
};
