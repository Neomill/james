import { resetInvoiceState } from "@/redux/features/invoiceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCreateInvoiceMutation } from "@/redux/services/invoicesAPI";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "../Button";
import POSReceiptCard from "../POSReceiptCard";

type Props = {};

const POSReceipt = (props: Props) => {
  const router = useRouter();
  const [createInvoice] = useCreateInvoiceMutation();
  const { orders, totalPrice } = useAppSelector((state) => state.invoice);
  const dispatch = useAppDispatch();
  const handleAddInvoice = async () => {
    await toast.promise(
      createInvoice({
        orders: orders.map((order) => ({
          qty: order.qty,
          menu_item_id: order.menu_item_id,
        })),
        table_id: Number(router.query.table),
      }).unwrap(),
      {
        error: "Error Creating Invoice!",
        pending: "Adding Invoice...",
        success: "Invoice added successfully!",
      }
    );
    dispatch(resetInvoiceState());
    router.push("/order-transaction/invoices");
  };
  return (
    <div className="h-full bg-white shadow-md  overflow-hidden  sm:grid-cols-3 lg:grid-cols-4 gap-4  w-full max-w-lg mx-auto">

      <div className="h-full  text-xs border-t border-gray-300 flex-col ">
        <dl style={{ height: "450px" }} className=" overflow-y-auto">
          {orders.map((order, idx) => {
            if (idx % 2 == 0) {
              return (
                <POSReceiptCard order={order} key={order.menu_item_id} isDark />
              );
            } else {
              return <POSReceiptCard order={order} key={order.menu_item_id} />;
            }
          })}
        </dl>
        <div className="mt-6">
          <div className="bg-white px-4 pb-4 sm:gap-4 sm:px-6 flex justify-between">
            <span className=" mb-2  font-bold">Total</span>
            <span className="mb-2 font-bold">
              ₱{numberWithCommas(Number(totalPrice).toFixed(2))}
            </span>
          </div>
          {/* <div className="text-xs pt-1 py-5 sm:gap-4 sm:px-6 flex justify-between ">
            <Button
              outline
              className="text-xs"
              size="medium"
              label="Bonus card"
            />

            <Button
              outline
              className="text-xs"
              size="medium"
              label=" Add a comment"
            />
          </div> */}

          <div className="sm:grid px-5 pb-4">
            <Button
              onClick={handleAddInvoice}
              className="text-xs"
              size="medium"
              label={`Add Invoice`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSReceipt;
