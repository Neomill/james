import React from "react";

interface Props {
  label: string;
}

const DisabledText: React.FC<Props> = ({ label, children, ...props }) => {
  return (
    <div className="mb-2 flex flex-col justify-between ">
      <div>
        <label className="uppercase ml-1 text-xs text-gray-400">{label}</label>
      </div>
      <p
        className={`outline-none px-4 py-1.5 bg-gray-50 w-full text-sm rounded-lg border `}
        {...props}
      >
        {children}
      </p>
    </div>
  );
};
export default DisabledText;
