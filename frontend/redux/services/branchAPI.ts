import { reduxAPI } from "./reduxAPI";

const branchAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllBranch: builder.query<
      { body: any[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/branch",
          params: { page },
        };
      },
      providesTags: ["Branch"],
    }),
    searchBranch: builder.query<
      { body: any[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/branch/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["Branch"],
    }),
    getBranchById: builder.query<any, string>({
      query: (id) => `/branch/${id}`,
    }),
    createBranch: builder.mutation({
      query: (data) => ({
        url: "/branch",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Branch"],
    }),
    updateBranch: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/branch/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Branch"],
    }),
    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/branch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Branch"],
    }),
    deleteManyBranch: builder.mutation({
      query: (data) => ({
        url: "/branch/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Branch"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBranchByIdQuery,
  useGetAllBranchQuery,
  useCreateBranchMutation,
  useDeleteBranchMutation,
  useUpdateBranchMutation,
  useSearchBranchQuery,
  useDeleteManyBranchMutation,
} = branchAPI;
