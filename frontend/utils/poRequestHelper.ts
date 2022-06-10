export const poRequestReasonColorPicker = (
  status: "OVERSTOCKING" | "BAD_ORDER" | "OTHERS" | "EXPIRED" | "STOCK_TRANSFER"
) => {
  switch (status) {
    case "OVERSTOCKING":
      return "bg-blue-50 text-blue-500";
    case "BAD_ORDER":
      return "bg-amber-50 text-amber-500";
    case "OTHERS":
      return "bg-gray-50 text-gray-700";
    case "EXPIRED":
      return "bg-red-50 text-red-500";
    case "STOCK_TRANSFER":
      return "bg-orange-50 text-orange-500";
    default:
      return "bg-blue-50 text-blue-500";
  }
};

export const poRequestReasonText = (
  status: "OVERSTOCKING" | "BAD_ORDER" | "OTHERS" | "EXPIRED" | "STOCK_TRANSFER"
) => {
  switch (status) {
    case "OVERSTOCKING":
      return "Overstocking";
    case "BAD_ORDER":
      return "Bad order";
    case "OTHERS":
      return "Others";
    case "EXPIRED":
      return "Expired";
    case "STOCK_TRANSFER":
      return "Stock Transfer";
    default:
      return "N/A";
  }
};

export const poRequestStatusColorPicker = (status: "PENDING" | "RETURNED") => {
  switch (status) {
    case "PENDING":
      return "bg-orange-50 text-orange-500";
    case "RETURNED":
      return "bg-emerald-50 text-emerald-500";
    default:
      return "bg-blue-50 text-blue-500";
  }
};

export const poRequestStatusText = (status: "PENDING" | "RETURNED") => {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "RETURNED":
      return "Returned";
    default:
      return "N/A";
  }
};
