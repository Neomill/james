import React from "react";
import styles from "./style.module.scss";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: React.HTMLInputTypeAttribute;
  label: string;
  name: string;
  placeholder: string;
  isDecimal?: boolean;
}

const Input = ({
  type = "text",
  label,
  name,
  placeholder,
  isDecimal = false,
  ...props
}: Props) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-2 flex flex-col justify-between ">
      {label !== "" ? (
        <div>
          <label className="uppercase ml-1 text-xs text-gray-400">
            {label}
          </label>
        </div>
      ) : null}

      {props.min !== undefined ? (
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <input
              onChange={(e) => {
                try {
                  if (!isDecimal) {
                    let sanitizedVal = parseInt(e.target.value);
                    if (sanitizedVal <= props.min) {
                      sanitizedVal = parseInt(props.min as string);
                    }
                    value = sanitizedVal;
                    onChange(sanitizedVal);
                  } else if (isDecimal) {
                    let sanitizedVal = e.target.value.replace("-", "");
                    value = sanitizedVal;
                    onChange(sanitizedVal);
                  }
                } catch (error) {}
              }}
              value={value}
              min={props.min && props.min}
              type={type}
              placeholder={placeholder}
              className={`text-xs outline-none px-4 py-1.5 bg-white w-full rounded h-9 border ${
                errors[name] ? "border-red-600" : ""
              }`}
              {...props}
            />
          )}
        />
      ) : (
        <>
          <input
            type={type}
            placeholder={placeholder}
            className={`text-xs outline-none px-4 py-1.5 bg-white w-full rounded h-9 border ${
              errors[name] ? "border-red-600" : ""
            }`}
            {...register(name)}
            {...props}
          />
          <ErrorMessage errors={errors} name={name} />
        </>
      )}
    </div>
  );
};
export default Input;
