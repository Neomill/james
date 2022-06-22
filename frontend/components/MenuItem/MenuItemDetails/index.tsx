import LabeledText from "@/components/LabeledText";
import { useGetMenuItemByIdQuery } from "@/redux/services/menuItemsAPI";
import { numberWithCommas } from "@/utils/numberWithCommas";
import dayjs from "dayjs";

type Props = {
  id: string;
  onClose: () => void;
};

export interface MenuItemProps {
  id: string;
  name: string;
  image_url: string;
  desc: string;
  qty: number;
  cost_price: number;
  selling_price: number;
  menu_item_category: any;
  menu_item_category_id: string;
  createdAt: string;
  updatedAt: string;
}

const MenuItemDetails = ({ id, onClose }: Props) => {
  const { data, isLoading } = useGetMenuItemByIdQuery(id, {
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
      {/* <img
        className="rounded-lg w-full h-40 object-cover"
        src={data.image_url ? data.image_url : "/shydan.jpg"}
        alt="No Image Available"
      /> */}
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
        <LabeledText label="Date Created">
          {dayjs(data.createdAt).format("YYYY-MM-DD")}
        </LabeledText>
        <LabeledText label="Date Updated">
          {dayjs(data.updatedAt).format("YYYY-MM-DD")}
        </LabeledText>
        <LabeledText className="col-span-2" label="Category">
          {data.menu_item_category?.name || "N/A"}
        </LabeledText>
      </div>
    </div>
  );
};

export default MenuItemDetails;
