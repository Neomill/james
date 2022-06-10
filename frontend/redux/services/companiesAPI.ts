import { CompanyProps } from "@/components/Company/CompanyDetails";
import { reduxAPI } from "./reduxAPI";

const companiesAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompany: builder.query<
      { body: CompanyProps[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/company",
          params: { page },
        };
      },
      providesTags: ["Company"],
    }),
    searchCompany: builder.query<
      { body: CompanyProps[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/company/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["Company"],
    }),
    getCompanyById: builder.query<CompanyProps, string>({
      query: (id) => `/company/${id}`,
    }),
    createCompany: builder.mutation({
      query: (data) => ({
        url: "/company",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Company", "Overview"],
    }),
    updateCompany: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/company/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Company", "Item", "Overview"],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/company/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company", "Item", "Overview"],
    }),
    deleteManyCompany: builder.mutation({
      query: (data) => ({
        url: "/company/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Company", "Item", "Overview"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCompanyByIdQuery,
  useGetAllCompanyQuery,
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  useUpdateCompanyMutation,
  useSearchCompanyQuery,
  useDeleteManyCompanyMutation,
} = companiesAPI;
