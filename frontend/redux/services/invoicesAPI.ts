import { InvoiceProps } from "@/components/Invoice/InvoiceDetails";
import { reduxAPI } from "./reduxAPI";

const invoicesAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllInvoice: builder.query<
      { body: InvoiceProps[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/invoices",
          params: { page },
        };
      },
      providesTags: ["Invoice"],
    }),
    searchInvoice: builder.query<
      { body: InvoiceProps[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/invoices/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["Invoice"],
    }),
    getInvoiceById: builder.query<InvoiceProps, string>({
      query: (id) => `/invoices/${id}`,
    }),
    createInvoice: builder.mutation({
      query: (data) => ({
        url: "/invoices",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Invoice", "Table"],
    }),
    updateInvoice: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/invoices/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Invoice", "Table"],
    }),

    // deleteInvoice: builder.mutation({
    //   query: (id) => ({
    //     url: `/invoice/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Invoice", "Item", "LowStockItem"],
    // }),
    // deleteManyInvoice: builder.mutation({
    //   query: (data) => ({
    //     url: "/invoice/bulk",
    //     method: "DELETE",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Invoice", "Item", "LowStockItem"],
    // }),
  }),
  overrideExisting: false,
});

export const {
  useGetInvoiceByIdQuery,
  useGetAllInvoiceQuery,
  useCreateInvoiceMutation,
  // useDeleteInvoiceMutation,
  useUpdateInvoiceMutation,
  useSearchInvoiceQuery,
  // useDeleteManyInvoiceMutation,
} = invoicesAPI;
