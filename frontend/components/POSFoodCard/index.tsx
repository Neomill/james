import { addInvoiceMenuItem } from "@/redux/features/invoiceSlice";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../Button";

type Props = {
  id: number | string;
  isTaken?: boolean;
  href?: string;
  image_url?: string;
  price: number;
  desc: string;
  name: string;
};

const POSFoodCard: React.FC<Props> = ({
  isTaken = false,
  id,
  href = "",
  image_url,
  desc,
  price,
  name,
}) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const addToInvoice = () => {
    dispatch(
      addInvoiceMenuItem({
        menu_item_id: id,
        qty,
        name,
        price,
      })
    );
  };
  return (
    <li
      className={`${
        isTaken ? "bg-gray-50 text-gray-500" : "cursor-pointer "
      } shadow transition transform duration-200 ease-in flex flex-col items-center gap-3  pb-4 rounded-lg `}
    >
      {/* <img
        className="rounded-lg w-full h-32 object-cover"
        src={image_url ? image_url : "/shydan.jpg"}
        alt="No Image Available"
      /> */}
      <div className="text-center pt-6 w-full text-gray-700 justify-between  flex flex-col px-4">
        <div className="flex flex-col gap-1 ">
          <p className="text-xs line-clamp-1  font-bold text-ellipsis">
            {name}
          </p>
          {/* {desc !== "N/A" && (
            <p className="text-xs line-clamp-1  text-gray-500">{desc}</p>
          )} */}
          <p className="text-xs">
            &#8369;
            {numberWithCommas(price)}
          </p>
        </div>
        <div className="w-full">
          <div className="mt-3 text-sm gap-4 flex  items-center justify-center">
            <div
              onClick={() => qty > 1 && setQty(qty - 1)}
              className="text-amber-500 bg-amber-50 w-5 h-5 rounded-sm"
            >
              -
            </div>
            <div className="text-xs">{qty}</div>
            <div
              onClick={() => setQty(qty + 1)}
              className="text-amber-500 bg-amber-50 w-5 h-5 rounded-sm"
            >
              +
            </div>
          </div>
          <Button
            onClick={addToInvoice}
            pill
            width="full"
            className="text-xs mt-3"
            size="small"
            label="Add"
          />
        </div>
      </div>
    </li>
  );
};

export default POSFoodCard;
