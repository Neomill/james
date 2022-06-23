import { reduxAPI } from "./reduxAPI";

const pullOutAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllPullOut: builder.query<
      { body: any[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/pull-out",
          params: { page },
        };
      },
      providesTags: ["PullOut"],
    }),
    searchPullOut: builder.query<
      { body: any[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/pull-out/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["PullOut"],
    }),
    getPullOutById: builder.query<any, string>({
      query: (id) => `/pull-out/${id}`,
    }),
    createPullOut: builder.mutation({
      query: (data) => ({
        url: "/pull-out",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PullOut"],
    }),
    updatePullOut: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/pull-out/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PullOut"],
    }),
    deletePullOut: builder.mutation({
      query: (id) => ({
        url: `/pull-out/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PullOut"],
    }),
    deleteManyPullOut: builder.mutation({
      query: (data) => ({
        url: "/pull-out/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["PullOut"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPullOutByIdQuery,
  useGetAllPullOutQuery,
  useCreatePullOutMutation,
  useDeletePullOutMutation,
  useUpdatePullOutMutation,
  useSearchPullOutQuery,
  useDeleteManyPullOutMutation,
} = pullOutAPI;
