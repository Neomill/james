import { ItemTransactionProps } from "@/components/ItemTransaction/ItemTransactionDetails";
import { reduxAPI } from "./reduxAPI";

const itemTransactionAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    searchItemTransactions: builder.query<
      { body: ItemTransactionProps[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/item-transaction/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["ItemTransaction"],
    }),
    getItemTransactionById: builder.query<ItemTransactionProps, string>({
      query: (id) => `/item-transaction/${id}`,
    }),
    updateItemTransaction: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/item-transaction/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ItemTransaction", "Overview", "Item"],
    }),
    deleteItemTransaction: builder.mutation({
      query: (id) => ({
        url: `/item-transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ItemTransaction", "Overview", "Item"],
    }),
    deleteManyItemTransaction: builder.mutation({
      query: (data) => ({
        url: "/item-transaction/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["ItemTransaction", "Overview", "Item"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useDeleteManyItemTransactionMutation,
  useSearchItemTransactionsQuery,
  useLazySearchItemTransactionsQuery,
  useGetItemTransactionByIdQuery,
  useUpdateItemTransactionMutation,
  useDeleteItemTransactionMutation,
  useLazyGetItemTransactionByIdQuery,
} = itemTransactionAPI;
