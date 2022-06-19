import { MenuItemProps } from "@/components/MenuItem/MenuItemDetails";
import { reduxAPI } from "./reduxAPI";

const menuMenuItemsAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllMenuItems: builder.query<
      { body: MenuItemProps[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/menu-item",
          params: { page },
        };
      },
      providesTags: ["MenuItem"],
    }),
    searchMenuItems: builder.query<
      { body: MenuItemProps[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number  }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/menu-item/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["MenuItem"],
    }),
    getMenuItemById: builder.query<MenuItemProps, string>({
      query: (id) => `/menu-item/${id}`,
    }),
    createMenuItem: builder.mutation({
      query: (data) => ({
        url: "/menu-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MenuItem", "Overview"],
    }),
    createManyMenuItem: builder.mutation({
      query: (data) => ({
        url: "/menu-item/bulk",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MenuItem", "Overview"],
    }),
    updateMenuItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/menu-item/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MenuItem", "Overview"],
    }),
    restockMenuItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/menu-item/${id}/restock`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MenuItem", "Overview"],
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `/menu-item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MenuItem", "Overview"],
    }),
    deleteManyMenuItem: builder.mutation({
      query: (data) => ({
        url: "/menu-item/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["MenuItem", "Overview"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMenuItemByIdQuery,
  useGetAllMenuItemsQuery,
  useCreateMenuItemMutation,
  useCreateManyMenuItemMutation,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
  useSearchMenuItemsQuery,
  useLazySearchMenuItemsQuery,
  useLazyGetMenuItemByIdQuery,
  useDeleteManyMenuItemMutation,
  useRestockMenuItemMutation,
} = menuMenuItemsAPI;
