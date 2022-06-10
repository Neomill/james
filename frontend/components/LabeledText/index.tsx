import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  label: string;
  valueTailwindSize?: string;
  valueTailwindFontWeight?: string;
  valueTailwindColor?: string;
}

const LabeledText: React.FC<Props> = ({
  label,
  children,
  valueTailwindSize = "text-sm",
  valueTailwindFontWeight = "font-medium",
  valueTailwindColor,
  ...props
}) => {
  return (
    <div {...props}>
      <small className="text-xs text-gray-400">{label}</small>
      <p
        className={`${valueTailwindSize} ${valueTailwindFontWeight} ${valueTailwindColor}`}
      >
        {children}
      </p>
    </div>
  );
};

export default LabeledText;
