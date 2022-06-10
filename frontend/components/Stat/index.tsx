import React from "react";
import { IconContext } from "react-icons";
import LabeledText from "../LabeledText";

type Props = {
  variant: "solid" | "basic" | "clean";
  label: string;
  icon?: any;
  color?: string;
  bg?: string;
};

const Stat: React.FC<Props> = ({
  variant = "solid",
  label,
  icon,
  color = "text-blue-500",
  bg = "bg-blue-50",
  children,
}) => {
  switch (variant) {
    case "clean":
      return (
        <div className="flex gap-3 ">
          <div
            className={` flex items-center justify-center transition duration-200 ease-in ${bg} rounded-xl w-12 h-12`}
          >
            <IconContext.Provider
              value={{
                className: ` cursor-pointer ${color} `,
                size: "20",
              }}
            >
              {icon}
            </IconContext.Provider>
          </div>
          <div className="flex flex-col">
            <LabeledText
              className="flex flex-col gap-0"
              valueTailwindFontWeight="font-bold"
              valueTailwindColor="text-gray-700"
              valueTailwindSize="text-2xl"
              label={label}
            >
              {children}
            </LabeledText>
          </div>
        </div>
      );
    case "solid":
      return (
        <div className="flex flex-col gap-3 bg-gray-50 rounded-lg justify-center  p-6">
          <div
            className={`flex items-center transition duration-200 ease-in rounded-xl w-12 h-12`}
          >
            <IconContext.Provider
              value={{
                className: `cursor-pointer ${color} `,
                size: "30",
              }}
            >
              {icon}
            </IconContext.Provider>
          </div>
          <div className="flex flex-col">
            <LabeledText
              className="flex flex-col gap-0"
              valueTailwindFontWeight="font-bold"
              valueTailwindColor="text-gray-700"
              valueTailwindSize="text-2xl"
              label={label}
            >
              {children}
            </LabeledText>
          </div>
        </div>
      );
    default:
      return <div>Default</div>;
  }
};

export default Stat;
