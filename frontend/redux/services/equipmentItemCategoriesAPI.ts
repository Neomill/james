import { reduxAPI } from "./reduxAPI";

const equipmentItemCategoriesAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllEquipmentItemCategory: builder.query<
      { body: any[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/equipment-item-category",
          params: { page },
        };
      },
      providesTags: ["EquipmentCategory"],
    }),
    searchEquipmentItemCategory: builder.query<
      { body: any[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/equipment-item-category/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["EquipmentCategory"],
    }),
    getEquipmentItemCategoryById: builder.query<any, string>({
      query: (id) => `/equipment-item-category/${id}`,
    }),
    createEquipmentItemCategory: builder.mutation({
      query: (data) => ({
        url: "/equipment-item-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EquipmentCategory"],
    }),
    updateEquipmentItemCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/equipment-item-category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["EquipmentCategory", "EquipmentItem"],
    }),
    deleteEquipmentItemCategory: builder.mutation({
      query: (id) => ({
        url: `/equipment-item-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EquipmentCategory", "EquipmentItem"],
    }),
    deleteManyEquipmentItemCategory: builder.mutation({
      query: (data) => ({
        url: "/equipment-item-category/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["EquipmentCategory", "EquipmentItem"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEquipmentItemCategoryByIdQuery,
  useGetAllEquipmentItemCategoryQuery,
  useCreateEquipmentItemCategoryMutation,
  useDeleteEquipmentItemCategoryMutation,
  useUpdateEquipmentItemCategoryMutation,
  useSearchEquipmentItemCategoryQuery,
  useDeleteManyEquipmentItemCategoryMutation,
} = equipmentItemCategoriesAPI;
