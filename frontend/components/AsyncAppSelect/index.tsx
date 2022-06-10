import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { GroupBase } from "react-select";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
interface optionsField {
  id: string;
  name: string;
}
interface AsyncAppSelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  loadOptions: LoadOptions<
    any,
    GroupBase<any>,
    {
      page: any;
    }
  >;
  label?: any;
  width?: string;
  name: string;
  placeholder: string;
}
const AsyncAppSelect = ({
  label,
  name,
  width,
  placeholder = "Select your option",
  loadOptions,
}: AsyncAppSelectProps) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();
  return (
    <div className={`mt-2 flex  flex-col justify-between ${width}`}>
      <div>
        <label className="uppercase ml-1 text-xs text-gray-400 ">{label}</label>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <AsyncPaginate
            name={name}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: errors[name] && "rgb(239 68 68)",
              }),
            }}
            onBlur={onBlur}
            value={value}
            className={`text-xs`}
            placeholder={placeholder}
            loadOptions={loadOptions}
            onChange={onChange}
            additional={{
              page: 0,
            }}
          />
        )}
      />
      {/* {errors[name] && (
        <small className="text-xs text-red-600 mt-1">
          {errors[name].message}
        </small>
      )} */}
    </div>
  );
};

export default AsyncAppSelect;
