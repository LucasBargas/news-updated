import React from "react";
import { FieldErrors } from "react-hook-form";
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

  return (
    <div
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
          onClick={() => setShowCategories(!showCategories)}
        />
      )}

      {props.name === "category" && showCategories && (
        <FormsFieldCategories setShowCategories={setShowCategories} />
      )}

      {errors && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};
