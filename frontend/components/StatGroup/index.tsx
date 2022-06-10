import React from "react";

type Props = {
  title: string;
};

const StatGroup: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm px-5 pt-5 pb-7 gap-6 flex flex-col">
      <h1 className="font-medium">{title}</h1>
      <div className="grid grid-cols-2 gap-9">{children}</div>
    </div>
  );
};

export default StatGroup;
