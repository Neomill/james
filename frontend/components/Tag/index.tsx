import React from "react";

type Props = {
  tailwindColor?: string;
};

const Tag: React.FC<Props> = ({ tailwindColor = "", children }) => {
  return (
    <div
      className={`${tailwindColor} w-max px-3 text-xs items-center justify-center text-center rounded-full font-medium p-1`}
    >
      {children}
    </div>
  );
};

export default Tag;
