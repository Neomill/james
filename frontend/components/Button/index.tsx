import { IconContext } from "react-icons";

interface ButtonProps {
  outline?: boolean;
  width?: "full" | "normal" | "wide" | "wider" | "auto" | "fit";
  colorScheme?:
    | "primary"
    | "secondary"
    | "warning"
    | "danger"
    | "success"
    | "pullout";
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: ({}: any) => void;
  pill?: boolean;
  icon?: any;
  iconSize?: number;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button = ({
  outline = false,
  size = "small",
  colorScheme = "primary",
  label,
  iconSize = 20,
  icon,
  width = "normal",
  type = "button",
  pill = false,
  className,
  ...props
}: ButtonProps) => {
  const classWidth =
    width == "wider"
      ? "w-48"
      : width == "wide"
      ? "w-36"
      : width == "fit"
      ? "min-w-fit"
      : width == "full"
      ? "w-full"
      : "w-auto";
  const classSize =
    size === "small"
      ? "py-1"
      : size === "medium"
      ? "py-2"
      : size === "large"
      ? "py-3"
      : "py-4";

  const rounded = pill ? "rounded-full" : "rounded-lg";

  const mode =
    outline === false
      ? colorScheme === "primary"
        ? `bg-blue-500 text-white hover:bg-blue-600`
        : colorScheme === "secondary"
        ? `bg-gray-300 text-neutral-700 hover:bg-gray-400 `
        : colorScheme === "warning"
        ? `bg-yellow-400 text-black hover:bg-amber-600 `
        : colorScheme === "danger"
        ? `bg-red-500 text-white hover:bg-red-600 `
        : colorScheme === "success"
        ? `bg-emerald-400 text-white hover:bg-emerald-400 `
        : colorScheme === "pullout"
        ? `bg-orange-400 text-white hover:bg-orange-400 `
        : `bg-white text-black`
      : colorScheme === "primary"
      ? `bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-600`
      : colorScheme === "secondary"
      ? `bg-gray-50 text-black hover:bg-gray-100`
      : colorScheme === "warning"
      ? `bg-amber-50 text-amber-500 hover:bg-amber-100 hover:text-amber-600`
      : colorScheme === "danger"
      ? `bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600`
      : colorScheme === "success"
      ? `bg-emerald-50 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600`
      : colorScheme === "pullout"
      ? `bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-600`
      : `bg-white text-black`;
  return (
    <button
      type={type}
      className={`${className} outline-none justify-center ${classWidth} ${rounded} ${mode} items-center gap-2 flex flex-row transition duration-200 ease-in px-4 text-sm ${classSize} `}
      {...props}
    >
      <IconContext.Provider value={{ size: `${iconSize}` }}>
        {icon}
      </IconContext.Provider>
      {label}
    </button>
  );
};
