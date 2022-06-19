import { reduxAPI } from "./reduxAPI";

const transactionsAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransaction: builder.query<
      { body: any[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/transaction",
          params: { page },
        };
      },
      providesTags: ["Transaction"],
    }),
    searchTransactions: builder.query<
      { body: any[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number , branch: number, notbranch,  }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, branch, notbranch, ...rest } = arg;
        return {
          url: "/transaction/search",
          params: { page, query, order,branch, notbranch, ...rest },
        };
      },
      providesTags: ["Transaction"],
    }),
    getTransactionById: builder.query<any, string>({
      query: (id) => `/transaction/${id}`,
    }),
    createTransaction: builder.mutation({
      query: (data) => ({
        url: "/transaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "Invoice", "Item", "Overview", "Table"],
    }),
    updateTransaction: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/transaction/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Transaction", "Invoice", "Item", "Overview", "Table"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction", "Item", "Invoice", "Overview", "Table"],
    }),
    deleteManyTransaction: builder.mutation({
      query: (data) => ({
        url: "/transaction/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Transaction", "Item", "Invoice", "Overview", "Table"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTransactionByIdQuery,
  useGetAllTransactionQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
  useSearchTransactionsQuery,
  useDeleteManyTransactionMutation,
} = transactionsAPI;
