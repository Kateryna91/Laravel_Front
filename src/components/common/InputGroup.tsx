import classNames from "classnames";
import React from "react";

interface InputGroupProps {
  label: string;
  field: string;
  touched?: boolean;
  type?: "text" | "email" | "password";
  error?: null | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  field,
  touched,
  type = "text",
  error = null,
  onChange,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <input
        type={type}
        name={field}
        id={field}
        className={classNames(
          "form-control",
          { "is-invalid": touched && error },
          { "is-valid": touched && !error }
        )}
        onChange={onChange}
      />
      {(touched && error) && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
