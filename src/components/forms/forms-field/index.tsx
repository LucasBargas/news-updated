import { ICategories } from "@/src/types/categories";
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
  categoriesList: ICategories[] | null;
  as?: "input" | "textarea";
}

export const FormsField = ({
  label,
  errors,
  errorMessage,
  categoriesList,
  as = "input",
  ...props
}: FormsCategoriesProps) => {
  const [showCategories, setShowCategories] = React.useState(false);
  const fieldRef = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowCategories(!showCategories);
  };

  React.useEffect(() => {
    if (!showCategories) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (fieldRef.current && !fieldRef.current.contains(e.target as Node))
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
  }, [showCategories]);

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

        {props.name === "category" && (
          <React.Fragment>
            <button
              type="button"
              onClick={handleClick}
              className={`${styles.formsFieldChevron} ${showCategories ? styles.active : ""}`}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>

            {showCategories && (
              <FormsFieldCategories
                categoriesList={categoriesList}
                setShowCategories={setShowCategories}
              />
            )}
          </React.Fragment>
        )}
      </div>

      {errors && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </React.Fragment>
  );
};
