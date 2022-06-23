// Need to use the React-specific entry point to import createApi
import API from "@/utils/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
export const reduxAPI = createApi({
  reducerPath: "reduxAPI",
  tagTypes: [
    "Item",
    "MenuItem",
    "EquipmentItem",
    "MenuItemCategory",
    "EquipmentCategory",
    "ItemLength",
    "LowStockItem",
    "SearchedItem",
    "ItemTransaction",
    "Company",
    "PORequest",
    "Employee",
    "Position",
    "Category",
    "Brand",
    "StorageLocation",
    "Overview",
    "Invoice",
    "Table",
    "Branch",
    "PullOut",
    "Transaction",
    "Customer"
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
