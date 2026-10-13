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
  const [showCategories, setShowCategories] = React.useState(false);
  const fieldRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!showCategories) return;

    const handleClickOutside = (e: PointerEvent) => {
      if (fieldRef.current && !fieldRef.current.contains(e.target as Node)) {
        setShowCategories(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showCategories]);

  return (
    <div
      ref={fieldRef}
      className={`${styles.formsField} ${
        props.name === "category" ? styles.isRelative : ""
      }`}
    >
      <label htmlFor={props.name}>{label}</label>

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

      {props.name === "category" && showCategories && (
        <FormsFieldCategories setShowCategories={setShowCategories} />
      )}

      {errors && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};
