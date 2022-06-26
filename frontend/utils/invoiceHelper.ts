import { ItemCondition } from "../components/Inventory/ItemDetails/index";
import {
  InvoicePaymentStatus,
  InvoiceStatus,
} from "@/components/Invoice/InvoiceDetails";

export const invoiceStatusColorPicker = (status: InvoiceStatus) => {
  switch (status) {
    case "REQUESTING_TO_OTHER_BRANCH":
      return "bg-violet-50 text-violet-500";
    case "IN_PROGRESS":
      return "bg-amber-50 text-amber-500";
    case "READY":
      return "bg-emerald-50 text-emerald-500";
    case "VOID":
      return "bg-gray-50 text-gray-700";
    default:
      return "bg-amber-50 text-amber-500";
  }
};

export const invoiceStatusText = (status: InvoiceStatus) => {
  switch (status) {
    case "IN_PROGRESS":
      return "In Progress";
    case "REQUESTING_TO_OTHER_BRANCH":
      return "Requested";  
    case "READY":
      return "Ready";
    case "VOID":
      return "Void";
    default:
      return "N/A";
  }
};

export const invoicePaymentStatusColorPicker = (
  status: InvoicePaymentStatus
) => {
  switch (status) {
    case "PAID":
      return "bg-emerald-50 text-emerald-500";
    case "PENDING":
      return "bg-amber-50 text-amber-500";
    default:
      return "bg-amber-50 text-amber-500";
  }
};

export const invoicePaymentStatusText = (status: InvoicePaymentStatus) => {
  switch (status) {
    case "PAID":
      return "Paid";
    case "PENDING":
      return "Pending";
    default:
      return "N/A";
  }
};
