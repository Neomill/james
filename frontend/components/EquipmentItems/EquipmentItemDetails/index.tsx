import LabeledText from "@/components/LabeledText";
import { useGetEquipmentItemByIdQuery } from "@/redux/services/equipmentItemsAPI";
import { numberWithCommas } from "@/utils/numberWithCommas";
import dayjs from "dayjs";

type Props = {
  id: string;
  onClose: () => void;
};

export interface EquipmentItemProps {
  id: string;
  name: string;
  image_url: string;
  remark: string;
  qty: number;
  cost_price: number;
  selling_price: number;
  equipment_category: any;
  equipment_category_id: string;
  createdAt: string;
  updatedAt: string;
}

const EquipmentItemDetails = ({ id, onClose }: Props) => {
  const { data, isLoading } = useGetEquipmentItemByIdQuery(id, { 
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
    <div className="flex flex-col md:flex-col gap-6">
      <img
        className="rounded-lg w-full h-40 object-cover"
        src={data.image_url ? data.image_url : "/shydan.jpg"}
        alt="No Image Available"
      />
      <div className="grid grid-cols-2 gap-3 w-96">
        <LabeledText label="Name">{data.name}</LabeledText>
        <LabeledText label="Cost Price">
          &#8369;
          {numberWithCommas(data.cost_price)}
        </LabeledText>
        <LabeledText label="Selling Price">
          &#8369;
          {numberWithCommas(data.selling_price)}
        </LabeledText>
        <LabeledText label="Qty">{data.qty}</LabeledText>
        <LabeledText label="Date Created">
          {dayjs(data.createdAt).format("YYYY-MM-DD")}
        </LabeledText>
        <LabeledText label="Date Updated">
          {dayjs(data.updatedAt).format("YYYY-MM-DD")}
        </LabeledText>
        <LabeledText className="col-span-2" label="Category">
          {data.equipment_category?.name || "N/A"}
        </LabeledText>
      </div>
    </div>
  );
};

export default EquipmentItemDetails;
