import { ItemCondition } from "./../components/Inventory/ItemDetails/index";
import { ItemStatus } from "@/components/Inventory/ItemDetails";

export const itemStatusColorPicker = (status: ItemStatus) => {
  switch (status) {
    case "IN_STOCK":
      return "bg-amber-50 text-amber-500";
    case "LOW_STOCK":
      return "bg-amber-50 text-amber-500";
    case "OUT_OF_STOCK":
      return "bg-gray-50 text-gray-700";
    default:
      return "bg-amber-50 text-amber-500";
  }
};

export const itemStatusText = (status: ItemStatus) => {
  switch (status) {
    case "IN_STOCK":
      return "In stock";
    case "LOW_STOCK":
      return "Low stock";
    case "OUT_OF_STOCK":
      return "Out of stock";
    default:
      return "N/A";
  }
};

export const itemConditionColorPicker = (status: ItemCondition) => {
  switch (status) {
    case "GOOD":
      return "bg-emerald-50 text-emerald-500";
    case "EXPIRED":
      return "bg-red-50 text-red-500";
    default:
      return "bg-amber-50 text-amber-500";
  }
};

export const itemConditionText = (status: "GOOD" | "EXPIRED") => {
  switch (status) {
    case "GOOD":
      return "Good";
    case "EXPIRED":
      return "Expired";
    default:
      return "N/A";
  }
};
