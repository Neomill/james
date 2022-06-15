import { EquipmentItemProps } from "@/components/EquipmentItems/EquipmentItemDetails";
import { reduxAPI } from "./reduxAPI";

const equipmentItemsAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllEquipmentItems: builder.query<
      { body: EquipmentItemProps[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/equipment-item",
          params: { page },
        };
      },
      providesTags: ["EquipmentItem"],
    }),
    searchEquipmentItems: builder.query<
      { body: EquipmentItemProps[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/equipment-item/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["EquipmentItem"],
    }),
    getEquipmentItemById: builder.query<EquipmentItemProps, string>({
      query: (id) => `/equipment-item/${id}`,
    }),
    createEquipmentItem: builder.mutation({
      query: (data) => ({
        url: "/equipment-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EquipmentItem", "Overview"],
    }),
    createManyEquipmentItem: builder.mutation({
      query: (data) => ({
        url: "/equipment-item/bulk",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EquipmentItem", "Overview"],
    }),
    updateEquipmentItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/equipment-item/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["EquipmentItem", "Overview"],
    }),
    restockEquipmentItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/equipment-item/${id}/restock`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["EquipmentItem", "Overview"],
    }),
    deleteEquipmentItem: builder.mutation({
      query: (id) => ({
        url: `/equipment-item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EquipmentItem", "Overview"],
    }),
    deleteManyEquipmentItem: builder.mutation({
      query: (data) => ({
        url: "/equipment-item/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["EquipmentItem", "Overview"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEquipmentItemByIdQuery,
  useGetAllEquipmentItemsQuery,
  useCreateEquipmentItemMutation,
  useCreateManyEquipmentItemMutation,
  useDeleteEquipmentItemMutation,
  useUpdateEquipmentItemMutation,
  useSearchEquipmentItemsQuery,
  useLazySearchEquipmentItemsQuery,
  useLazyGetEquipmentItemByIdQuery,
  useDeleteManyEquipmentItemMutation,
  useRestockEquipmentItemMutation,
} = equipmentItemsAPI;
