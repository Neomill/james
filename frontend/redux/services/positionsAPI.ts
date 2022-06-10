import { PositionProps } from "@/components/Position/PositionDetails";
import { reduxAPI } from "./reduxAPI";

const positionsAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPositions: builder.query<
      { body: PositionProps[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/position",
          params: { page },
        };
      },
      providesTags: ["Position"],
    }),
    searchPositions: builder.query<
      { body: PositionProps[]; totalPages: number },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/position/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["Position"],
    }),
    getPositionById: builder.query<PositionProps, string>({
      query: (id) => `/position/${id}`,
    }),
    createPosition: builder.mutation({
      query: (data) => ({
        url: "/position",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Position"],
    }),
    updatePosition: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/position/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Position", "Employee"],
    }),
    deletePosition: builder.mutation({
      query: (id) => ({
        url: `/position/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Position", "Employee"],
    }),
    deleteManyPosition: builder.mutation({
      query: (data) => ({
        url: "/position/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Position", "Employee"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPositionsQuery,
  useGetPositionByIdQuery,
  useCreatePositionMutation,
  useDeletePositionMutation,
  useUpdatePositionMutation,
  useSearchPositionsQuery,
  useDeleteManyPositionMutation,
} = positionsAPI;
