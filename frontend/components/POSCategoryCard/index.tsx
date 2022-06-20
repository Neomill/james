import { setFilters } from "@/redux/features/filterSlice";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  isTaken?: boolean;
  href?: string;
  id: number | string;
};

const POSCategoryCard: React.FC<Props> = ({
  isTaken = false,
  href = "/pos/add-order/1/2",
  id,
  children,
}) => {
  const router = useRouter();
  const onSelectCategory = () => {
    router.push(href);
  };
  return (
    <li
      onClick={onSelectCategory}
      className={`${
        isTaken
          ? "bg-gray-50 text-gray-500"
          : "cursor-pointer hover:scale-110  bg-blue-50 text-blue-500"
      }  transition transform duration-200 ease-in flex flex-col items-center justify-center p-2 h-40 rounded-lg `}
    >
      <p className="text-sm font-bold">{children}</p>
    </li>
  );
};

export default POSCategoryCard;
