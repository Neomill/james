import { Button } from "@/components/Button";
import Input from "@/components/Input";
import POSReceiptCard from "@/components/POSReceiptCard";
import ReceiptPDF from "@/components/ReceiptPDF";
import { useGetInvoiceByIdQuery } from "@/redux/services/invoicesAPI";
import {
  useCreateTransactionMutation,
  useGetTransactionByIdQuery,
} from "@/redux/services/transactionsAPI";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { yupResolver } from "@hookform/resolvers/yup";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsCloudDownload, BsDownload } from "react-icons/bs";
import { toast } from "react-toastify";
import * as yup from "yup";

type Props = {
  id: string;
  onClose: () => void;
};

const TransactionDetails = ({ id, onClose }: Props) => {
  const { data, isLoading } = useGetTransactionByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const [createTransaction] = useCreateTransactionMutation();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (data) {
      console.log("transaction", data);
    }
  }, [data, isLoading]);

  const router = useRouter();

  const handlePayment = async (formVal: any) => {
    //payment
    await toast.promise(
      createTransaction({
        invoice_id: id,
        transaction_code: data.table?.name + Date.now() + id,
        cash: formVal.cash,
      }).unwrap(),
      {
        error: "Insufficient Funds/Out of Stock",
        pending: "Transaction In Progress...",
        success: "Transaction Complete.",
      }
    );
    onClose();
  };
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (!data) {
    return <div>Wow! Such empty.</div>;
  }

  return (
    <div className="h-full bg-white border rounded-lg   overflow-hidden  sm:grid-cols-3 lg:grid-cols-4 gap-4  w-96 max-w-lg mx-auto">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-base leading-6 font-medium text-gray-900">
          Table {data.invoice?.table?.name}
        </h3>
      </div>
      <div className="h-full  text-xs border-t border-gray-300 flex-col ">
        <dl style={{ height: "450px" }} className=" overflow-y-auto">
          {data?.invoice?.orders?.map((order, idx) => {
            let mod_order = { ...order, name: order.menu_item?.name };
            if (idx % 2 == 0) {
              return (
                <POSReceiptCard
                  order={mod_order}
                  key={order.menu_item_id}
                  isDark
                />
              );
            } else {
              return (
                <POSReceiptCard order={mod_order} key={order.menu_item_id} />
              );
            }
          })}
        </dl>
        <div className="mt-3">
          <div className="bg-white px-4 pb-4 sm:gap-4 sm:px-6 flex justify-between">
            <span className=" mb-2  font-bold">Total</span>
            <span className="mb-2 font-bold">
              ₱{numberWithCommas(Number(data.price).toFixed(2))}
            </span>
          </div>
          <div className="bg-white px-4 pb-4 sm:gap-4 sm:px-6 flex justify-between">
            <span className=" mb-2  font-bold">Cash Tendered</span>
            <span className="mb-2 font-bold">
              ₱{numberWithCommas(Number(data.cash).toFixed(2))}
            </span>
          </div>
          <div className="border-t py-2 bg-white px-4 pb-4 sm:gap-4 sm:px-6 flex justify-between">
            <span className=" mb-2  font-bold">Change</span>
            <span className="mb-2 font-bold">
              ₱{numberWithCommas(Number(data.change).toFixed(2))}
            </span>
          </div>
          <div className="p-2">
            <PDFDownloadLink
              document={
              <ReceiptPDF 
                transaction={data} 
                cfname={data?.customer.fname}  
                clname={data?.customer.lname}  
                efname={data?.employee.fname}  
                elname={data?.employee.lname}  
                />
              }
              fileName={`${data.transaction_code}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  "Loading document..."
                ) : (
                  <Button
                    icon={<BsDownload />}
                    iconSize={14}
                    width="full"
                    className="text-xs"
                    size="medium"
                    label={`Download`}
                  />
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
