import { reduxAPI } from "./reduxAPI";

const menuItemCategoriesAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllMenuItemCategory: builder.query<
      { body: any[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/menu-item-category",
          params: { page },
        };
      },
      providesTags: ["MenuItemCategory"],
    }),
    searchMenuItemCategory: builder.query<
      { body: any[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/menu-item-category/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["MenuItemCategory"],
    }),
    getMenuItemCategoryById: builder.query<any, string>({
      query: (id) => `/menu-item-category/${id}`,
    }),
    createMenuItemCategory: builder.mutation({
      query: (data) => ({
        url: "/menu-item-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MenuItemCategory"],
    }),
    updateMenuItemCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/menu-item-category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MenuItemCategory", "MenuItem"],
    }),
    deleteMenuItemCategory: builder.mutation({
      query: (id) => ({
        url: `/menu-item-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MenuItemCategory", "MenuItem"],
    }),
    deleteManyMenuItemCategory: builder.mutation({
      query: (data) => ({
        url: "/menu-item-category/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["MenuItemCategory", "MenuItem"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMenuItemCategoryByIdQuery,
  useGetAllMenuItemCategoryQuery,
  useCreateMenuItemCategoryMutation,
  useDeleteMenuItemCategoryMutation,
  useUpdateMenuItemCategoryMutation,
  useSearchMenuItemCategoryQuery,
  useDeleteManyMenuItemCategoryMutation,
} = menuItemCategoriesAPI;
