import { StorageLocationProps } from "@/components/StorageLocation/StorageLocationDetails";
import { reduxAPI } from "./reduxAPI";

const storageLocationAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllStorageLocation: builder.query<
      { body: StorageLocationProps[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/storage",
          params: { page },
        };
      },
      providesTags: ["StorageLocation"],
    }),
    searchStorageLocations: builder.query<
      { body: StorageLocationProps[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/storage/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["StorageLocation"],
    }),
    getStorageLocationById: builder.query<StorageLocationProps, string>({
      query: (id) => `/storage/${id}`,
    }),
    createStorageLocation: builder.mutation({
      query: (data) => ({
        url: "/storage",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StorageLocation"],
    }),
    updateStorageLocation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/storage/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["StorageLocation", "Item", "LowStockItem"],
    }),
    deleteStorageLocation: builder.mutation({
      query: (id) => ({
        url: `/storage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StorageLocation", "Item", "LowStockItem"],
    }),
    deleteManyStorageLocation: builder.mutation({
      query: (data) => ({
        url: "/storage/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["StorageLocation", "Item", "LowStockItem"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStorageLocationByIdQuery,
  useGetAllStorageLocationQuery,
  useCreateStorageLocationMutation,
  useDeleteStorageLocationMutation,
  useUpdateStorageLocationMutation,
  useSearchStorageLocationsQuery,
  useLazySearchStorageLocationsQuery,
  useLazyGetStorageLocationByIdQuery,
  useDeleteManyStorageLocationMutation,
} = storageLocationAPI;
