import { CustomerProps } from "@/components/Customer/CustomerDetails";
import { reduxAPI } from "./reduxAPI";

const customerAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query<
      { body: CustomerProps[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/customer",
          params: { page },
        };
      },
      providesTags: ["Customer"],
    }),
    searchCustomers: builder.query<
      { body: CustomerProps[]; totalPages: number },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "" , ...rest } = arg;
        return {
          url: "/customer/search",
          params: { page, query, ...rest },
        };
      },
      providesTags: ["Customer"],
    }),
    getCustomerById: builder.query<CustomerProps, string>({
      query: (id) => `/customer/${id}`,
      providesTags: ["Customer"],
    }),
    createCustomer: builder.mutation({
      query: (data) => ({
        url: "/customer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/customer/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Customer", "PORequest"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer", "PORequest"],
    }),
    deleteManyCustomer: builder.mutation({
      query: (data) => ({
        url: "/customer/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Customer", "PORequest"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCustomersQuery,
  useCreateCustomerMutation,
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useSearchCustomersQuery,
  useDeleteManyCustomerMutation,
} = customerAPI;
