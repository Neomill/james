import { ItemCondition, ItemProps } from "@/components/Inventory/ItemDetails";
import LabeledText from "@/components/LabeledText";
import { useGetItemTransactionByIdQuery } from "@/redux/services/itemTransactionAPI";
import dayjs from "dayjs";

type Props = {
  id: string;
  onClose: () => void;
};

export interface ItemTransactionProps {
  id: number;
  createdAt: string;
  updatedAt: string;
  expiry_date: string;
  condition: ItemCondition;
  date_received: string;
  item: ItemProps;
  qty: number;
}
const ItemTransactionDetails = ({ id, onClose }: Props) => {
  const { data, isLoading } = useGetItemTransactionByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>Wow! Such empty.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="grid grid-cols-2 gap-3 w-96">
        <LabeledText label="Item Name">{data.item.name}</LabeledText>
        <LabeledText label="Quantity">{data.qty}</LabeledText>
        <LabeledText label="Condition">{data.condition}</LabeledText>
        <LabeledText label="Expiry Date">
          {dayjs(data.expiry_date).format("YYYY-MM-DD")}
        </LabeledText>
        <LabeledText label="Date Received">
          {dayjs(data.date_received).format("YYYY-MM-DD")}
        </LabeledText>
        <LabeledText label="Date Created">
          {dayjs(data.createdAt).format("YYYY-MM-DD")}
        </LabeledText>
        <LabeledText label="Date Updated">
          {dayjs(data.updatedAt).format("YYYY-MM-DD")}
        </LabeledText>
      </div>
    </div>
  );
};

export default ItemTransactionDetails;
