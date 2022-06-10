import { ItemProps } from "@/components/Inventory/ItemDetails";
import { reduxAPI } from "./reduxAPI";

const itemsAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query<
      { body: ItemProps[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/items",
          params: { page },
        };
      },
      providesTags: ["Item"],
    }),
    searchItems: builder.query<
      { body: ItemProps[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/items/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["Item"],
    }),
    getItemById: builder.query<ItemProps, string>({
      query: (id) => `/items/${id}`,
    }),
    createItem: builder.mutation({
      query: (data) => ({
        url: "/items",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Item", "Overview"],
    }),
    createManyItem: builder.mutation({
      query: (data) => ({
        url: "/items/bulk",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Item", "Overview"],
    }),
    updateItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Item", "Overview"],
    }),
    restockItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/items/${id}/restock`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Item", "Overview"],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item", "Overview"],
    }),
    deleteManyItem: builder.mutation({
      query: (data) => ({
        url: "/items/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Item", "Overview"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetItemByIdQuery,
  useGetAllItemsQuery,
  useCreateItemMutation,
  useCreateManyItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useSearchItemsQuery,
  useLazySearchItemsQuery,
  useLazyGetItemByIdQuery,
  useDeleteManyItemMutation,
  useRestockItemMutation,
} = itemsAPI;
