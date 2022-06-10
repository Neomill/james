import { PORequestProps } from "@/components/PORequest/PORequestDetails";
import { reduxAPI } from "./reduxAPI";

const poRequestAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllPORequest: builder.query<
      { body: PORequestProps[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/po-requests",
          params: { page },
        };
      },
      providesTags: ["PORequest"],
    }),
    searchPORequest: builder.query<
      { body: PORequestProps[]; totalPages: number },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        console.log("a", arg);
        return {
          url: "/po-requests/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["PORequest"],
    }),
    getPORequestById: builder.query<PORequestProps, string>({
      query: (id) => `/po-requests/${id}`,
    }),
    createManyPORequest: builder.mutation({
      query: (data) => ({
        url: "/po-requests/bulk",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PORequest", "Item", "Overview"],
    }),
    createPORequest: builder.mutation({
      query: (data) => ({
        url: "/po-requests",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PORequest", "Item", "Overview"],
    }),
    updatePORequest: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/po-requests/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PORequest", "Item", "Overview"],
    }),
    deletePORequest: builder.mutation({
      query: (id) => ({
        url: `/po-requests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PORequest", "Item", "Overview"],
    }),

    deleteManyPORequest: builder.mutation({
      query: (data) => ({
        url: "/po-requests/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["PORequest", "Item", "Overview"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllPORequestQuery,
  useCreatePORequestMutation,
  useDeletePORequestMutation,
  useUpdatePORequestMutation,
  useGetPORequestByIdQuery,
  useSearchPORequestQuery,
  useCreateManyPORequestMutation,
  useLazySearchPORequestQuery,
  useDeleteManyPORequestMutation,
} = poRequestAPI;
