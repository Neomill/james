import { reduxAPI } from "./reduxAPI";

const tablesAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllTable: builder.query<
      { body: any[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/tables",
          params: { page },
        };
      },
      providesTags: ["Table"],
    }),
    searchTable: builder.query<
      { body: any[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/tables/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["Table"],
    }),
    getTableById: builder.query<any, string>({
      query: (id) => `/tables/${id}`,
    }),
    createTable: builder.mutation({
      query: (data) => ({
        url: "/tables",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Table"],
    }),
    deleteTable: builder.mutation({
      query: (id) => ({
        url: `/tables/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Table"],
    }),
    deleteManyTable: builder.mutation({
      query: (data) => ({
        url: "/tables/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Table"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTableByIdQuery,
  useGetAllTableQuery,
  useCreateTableMutation,
  useDeleteTableMutation,
  // useUpdateTableMutation,
  useSearchTableQuery,
  useDeleteManyTableMutation,
} = tablesAPI;
