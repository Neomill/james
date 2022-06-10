import React, { Children } from "react";
import {
  BsArrowLeftCircle,
  BsArrowReturnLeft,
  BsBoxArrowLeft,
  BsCaretLeft,
  BsEye,
  BsEyedropper,
  BsEyeFill,
  BsEyeSlash,
  BsPencil,
  BsPencilSquare,
  BsPlus,
  BsPlusCircle,
  BsPlusSquare,
  BsReceipt,
  BsTrash,
} from "react-icons/bs";
import styles from "./style.module.scss";

type Props = {
  action: "edit" | "view" | "delete" | "pull-out" | "add" | "receipt";
  onClick?: (e: any) => void;
};

const TooltipContainer = ({ tooltip, children }) => {
  return (
    <div className={[styles["tooltip"]].join(" ")}>
      {children}
      <span
        className={[
          "-right-7 -bottom-8 w-16 bg-gray-100 px-2 rounded-lg text-gray-500 text-xs items-center justify-center text-center py-1 z-1 absolute",
          styles["tooltiptext"],
        ].join(" ")}
      >
        {tooltip}
      </span>
    </div>
  );
};

const ActionButton = ({ action, onClick, ...props }: Props) => {
  switch (action) {
    case "edit":
      return (
        <TooltipContainer tooltip="Edit">
          <BsPencilSquare
            {...props}
            onClick={onClick}
            className="hover:text-amber-500 text-amber-400 cursor-pointer text-lg"
          />
        </TooltipContainer>
      );
    case "delete":
      return (
        <TooltipContainer tooltip="Delete">
          <BsTrash
            {...props}
            onClick={onClick}
            className="hover:text-red-600 text-red-500 cursor-pointer text-lg"
          />
        </TooltipContainer>
      );
    case "view":
      return (
        <TooltipContainer tooltip="View">
          <BsEye
            {...props}
            onClick={onClick}
            className="hover:text-blue-600 text-blue-500 cursor-pointer text-lg"
          />
        </TooltipContainer>
      );
    case "pull-out":
      return (
        <TooltipContainer tooltip="Pull out">
          <BsBoxArrowLeft
            {...props}
            onClick={onClick}
            className="hover:text-orange-600 text-orange-500 cursor-pointer text-lg"
          />
        </TooltipContainer>
      );
    case "add":
      return (
        <TooltipContainer tooltip="Restock">
          <BsPlusCircle
            {...props}
            onClick={onClick}
            className="hover:text-emerald-600 text-emerald-500 cursor-pointer text-lg"
          />
        </TooltipContainer>
      );
    case "receipt":
      return (
        <TooltipContainer tooltip="Receipt">
          <BsReceipt
            {...props}
            onClick={onClick}
            className="hover:text-blue-600 text-blue-500 cursor-pointer text-lg"
          />
        </TooltipContainer>
      );
    default:
      break;
  }
};

export default ActionButton;
