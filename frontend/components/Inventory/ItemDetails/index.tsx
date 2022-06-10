import dayjs from "dayjs";
import LabeledText from "@/components/LabeledText";
import { useGetItemByIdQuery } from "@/redux/services/itemsAPI";
import {
  itemConditionColorPicker,
  itemConditionText,
  itemStatusText,
} from "@/utils/itemHelper";
import StyledTable from "@/components/StyledTable";
import { useMemo } from "react";
import { numberWithCommas } from "@/utils/numberWithCommas";
import Tag from "@/components/Tag";

type Props = {
  id: string;
  onClose: () => void;
};

export enum ItemStatus {
  IN_STOCK = "IN_STOCK",
  LOW_STOCK = "LOW_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
}

export enum ItemCondition {
  GOOD = "GOOD",
  EXPIRED = "EXPIRED",
}

export interface ItemTransaction {
  id: string;
  price: number;
  qty: number;
  createdAt: string;
  updatedAt: string;
  expiry_date: string;
  date_received: string;
  condition: ItemCondition;
}
export interface ItemProps {
  id: string;
  name: string;
  desc?: string;
  qty: number;
  cost_price: number;
  selling_price: number;
  stock_alert_ctr: number;
  company: any;
  company_id: string;
  storage_location: any;
  storage_location_id: string;
  brand: any;
  brand_id: string;
  item_transactions: ItemTransaction[];
  status: ItemStatus;
  category: any;
  category_id: string;
  createdAt: string;
  updatedAt: string;
}

const ItemDetails = ({ id, onClose }: Props) => {
  const { data, isLoading } = useGetItemByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const transactionColummns = useMemo<any>(
    () => [
      {
        Header: "#",
        accessor: "id",
      },
      {
        Header: "Qty",
        accessor: "qty",
      },
      {
        Header: "Condition",
        accessor: "condition",
        Cell: (props: any) => (
          <Tag tailwindColor={itemConditionColorPicker(props.value)}>
            {itemConditionText(props.value)}
          </Tag>
        ),
      },
      {
        Header: "Expiry date",
        accessor: "expiry_date",
        Cell: (props: any) => (
          <div>{dayjs(props.value).format("MM-DD-YYYY")}</div>
        ),
      },
      {
        Header: "Date received",
        accessor: "date_received",
        Cell: (props: any) => (
          <div>{dayjs(props.value).format("MM-DD-YYYY")}</div>
        ),
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
    <div className="flex flex-col md:flex-row gap-6">
      <div className="grid grid-cols-2 gap-3 w-96">
        <LabeledText label="Name">{data.name}</LabeledText>
        <LabeledText label="Description">{data.desc}</LabeledText>
        <LabeledText label="Cost Price">
          &#8369;
          {numberWithCommas(data.cost_price)}
        </LabeledText>
        <LabeledText label="Selling Price">
          &#8369;
          {numberWithCommas(data.selling_price)}
        </LabeledText>
        <LabeledText label="Qty">{data.qty}</LabeledText>
        <LabeledText label="Status">{itemStatusText(data.status)}</LabeledText>
        <LabeledText label="Stock Alert Ctr">
          {data.stock_alert_ctr}
        </LabeledText>
        <LabeledText label="Date Created">
          {dayjs(data.createdAt).format("YYYY-MM-DD")}
        </LabeledText>
        <LabeledText label="Date Updated">
          {dayjs(data.updatedAt).format("YYYY-MM-DD")}
        </LabeledText>
        <LabeledText className="border-t col-span-2" label="Company">
          {data.company?.name || "N/A"}
        </LabeledText>
        <LabeledText className="col-span-2" label="Brand">
          {data.brand?.name || "N/A"}
        </LabeledText>
        <LabeledText className="col-span-2" label="Category">
          {data.category?.name || "N/A"}
        </LabeledText>
        <LabeledText className="col-span-2" label="Storage Location">
          {data.storage_location?.name || "N/A"}
        </LabeledText>
      </div>
      <div className="flex flex-col gap-3">
        <label className="uppercase ml-1 text-xs text-gray-400">
          Transaction History
        </label>

        <div
          style={{ width: "600px", height: "500px" }}
          className=" overflow-y-auto border rounded-lg"
        >
          <StyledTable
            minH="100%"
            fontSize="text-xs"
            noCheckbox
            columns={transactionColummns}
            data={data.item_transactions}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
