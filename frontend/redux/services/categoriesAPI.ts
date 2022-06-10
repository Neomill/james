import { CategoryProps } from "@/components/Category/CategoryDetails";
import { reduxAPI } from "./reduxAPI";

const categoriesAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query<
      { body: CategoryProps[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/category",
          params: { page },
        };
      },
      providesTags: ["Category"],
    }),
    searchCategory: builder.query<
      { body: CategoryProps[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/category/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query<CategoryProps, string>({
      query: (id) => `/category/${id}`,
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category", "Item", "LowStockItem"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category", "Item", "LowStockItem"],
    }),
    deleteManyCategory: builder.mutation({
      query: (data) => ({
        url: "/category/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Category", "Item", "LowStockItem"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoryByIdQuery,
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useSearchCategoryQuery,
  useDeleteManyCategoryMutation,
} = categoriesAPI;
