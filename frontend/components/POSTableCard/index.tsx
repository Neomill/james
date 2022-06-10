import { useRouter } from "next/router";
import React from "react";

type Props = {
  isTaken?: boolean;
  href?: string;
  name: string;
};

const POSTableCard: React.FC<Props> = ({
  isTaken = false,
  href = "/pos/add-order/1",
  name,
}) => {
  const router = useRouter();
  return (
    <li
      onClick={() => !isTaken && router.push(href)}
      className={`${
        isTaken
          ? "bg-gray-50 text-gray-500"
          : " hover:scale-110  cursor-pointer bg-blue-50 text-blue-500"
      }  text-sm transition transform duration-200 ease-in flex flex-col items-center justify-center p-2 h-52 rounded-lg `}
    >
      <p className="font-bold">{name}</p>
      <p className="text-xs">{isTaken ? "Occupied" : "Available"}</p>
    </li>
  );
};

export default POSTableCard;
