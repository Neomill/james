import { InvoiceOrderProps } from "@/redux/features/invoiceSlice";
import { numberWithCommas } from "@/utils/numberWithCommas";
import React from "react";

type Props = {
  isDark?: boolean;
  order: InvoiceOrderProps;
};

const POSReceiptCard = ({ isDark = false, order }: Props) => {
  const color = isDark ? "bg-gray-50" : "bg-white";
  return (
    <div className={`${color} px-4 py-5 sm:gap-4 sm:px-6 flex justify-between`}>
      <dt className=" font-medium ">
        {order.name}
        <p className="text-gray-400 pt-1">
          {" "}
          ₱{numberWithCommas(Number(order.price).toFixed(2))}
        </p>
      </dt>
      <dd className=" sm:mt-0 sm:text-center pl-9">{order.qty}</dd>
      <dd className="font-medium  ">
        ₱{numberWithCommas(Number(order.price * order.qty).toFixed(2))}
      </dd>
    </div>
  );
};

export default POSReceiptCard;
