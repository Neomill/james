import { ItemProps } from "@/components/Inventory/ItemDetails";
import { ItemTransactionProps } from "@/components/ItemTransaction/ItemTransactionDetails";
import LabeledText from "@/components/LabeledText";
import { StorageLocationProps } from "@/components/StorageLocation/StorageLocationDetails";
import StyledTable from "@/components/StyledTable";
import { useGetPORequestByIdQuery } from "@/redux/services/poRequestAPI";
import { numberWithCommas } from "@/utils/numberWithCommas";
import {
  poRequestReasonText,
  poRequestStatusText,
} from "@/utils/poRequestHelper";
import dayjs from "dayjs";
import { useMemo } from "react";

type Props = {
  id: string;
  onClose: () => void;
};

export interface PORequestProps {
  id: string;
  attendant: any;
  attendant_id: string;
  item_transaction: ItemTransactionProps;
  storage_location: StorageLocationProps;
  item_transaction_id: string;
  storage_location_id: string;
  remarks: string;
  request_no: string;
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  qty: number;
}

const PORequestDetails = ({ id, onClose }: Props) => {
  const { data, isLoading } = useGetPORequestByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const columns = useMemo<any>(
    () => [
      {
        Header: "#",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Qty",
        accessor: "qty",
      },
      {
        Header: "Price",
        accessor: "price",
      },
    ],
    []
  );
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>Wow! Such empty.</div>;
  }

  return (
    <div className="flex flex-col gap-6 ">
      <div className="grid grid-cols-2 w-96">
        <LabeledText label="Request Number">{data.request_no}</LabeledText>

        <LabeledText label="Reason">
          {poRequestReasonText(data.reason as any)}
        </LabeledText>
        <LabeledText label="Status">
          {poRequestStatusText(data.status as any)}
        </LabeledText>
        <LabeledText label="Requested Quantity">{data.qty}</LabeledText>
        <LabeledText label="Storage Location">
          {data.storage_location.name}
        </LabeledText>
        <LabeledText label="Attendant">
          {data.attendant.fname + " " + data.attendant.lname}
        </LabeledText>
        <LabeledText label="Date Created">
          {dayjs(data.createdAt).format("YYYY-MM-DD")}
        </LabeledText>
        <LabeledText label="Date Updated">
          {dayjs(data.updatedAt).format("YYYY-MM-DD")}
        </LabeledText>
        <LabeledText
          className={`${data.remarks.length > 30 && " col-span-2"}`}
          label="Remarks"
        >
          {data.remarks}
        </LabeledText>
      </div>
      {data.item_transaction?.item && (
        <>
          <hr />
          <div className="grid grid-cols-2 w-96">
            <LabeledText label="Transaction #">
              {data.item_transaction?.id}
            </LabeledText>
            <LabeledText label="Transaction Expiry">
              {dayjs(data.item_transaction?.expiry_date).format("YYYY-MM-DD")}
            </LabeledText>
            <LabeledText label="Item Name">
              {data.item_transaction?.item?.name}
            </LabeledText>
            <LabeledText label="Item Description">
              {data.item_transaction?.item?.desc}
            </LabeledText>
            <LabeledText label="Item Quantity">
              {data.item_transaction?.item?.qty}
            </LabeledText>
            <LabeledText label="Item Cost Price">
              ₱{numberWithCommas(data.item_transaction?.item?.cost_price)}
            </LabeledText>
            <LabeledText label="Item Selling Price">
              ₱{numberWithCommas(data.item_transaction?.item?.selling_price)}
            </LabeledText>
          </div>
        </>
      )}
    </div>
  );
};

export default PORequestDetails;
