import React from "react";
import { useFormContext } from "react-hook-form";
import styles from "./style.module.scss";
interface optionsField {
  id: string;
  name: string;
}
interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options?: Array<optionsField>;
  value?: any;
  onChange?: any;
  label?: any;
  name: string;
  placeholder: string;
}
const Select = ({
  label,
  placeholder = "Select your option",
  value,
  name,
  options = [],
  ...props
}: SelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-2 flex  flex-col justify-between ">
      <div>
        <label className="uppercase ml-1 text-xs text-gray-400 ">{label}</label>
      </div>
      <select
        defaultValue=""
        placeholder="Select"
        {...register(name)}
        {...props}
        className={[
          `bg-white text-xs outline-none py-1.5 px-4 w-full rounded h-9 border  ${
            errors[name] ? "border-red-600" : ""
          }`,
        ].join(" ")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((data) => {
          return (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
