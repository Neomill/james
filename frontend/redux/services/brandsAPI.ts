import { BrandProps } from "@/components/Brand/BrandDetails";
import { reduxAPI } from "./reduxAPI";

const brandsAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrand: builder.query<
      { body: BrandProps[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/brands",
          params: { page },
        };
      },
      providesTags: ["Brand"],
    }),
    searchBrands: builder.query<
      { body: BrandProps[]; totalPages: number; hasMore: boolean },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/brands/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["Brand"],
    }),
    getBrandById: builder.query<BrandProps, string>({
      query: (id) => `/brands/${id}`,
    }),
    createBrand: builder.mutation({
      query: (data) => ({
        url: "/brands",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/brands/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Brand", "Item"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand", "Item"],
    }),
    deleteManyBrand: builder.mutation({
      query: (data) => ({
        url: "/brands/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Brand", "Item"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBrandByIdQuery,
  useGetAllBrandQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
  useSearchBrandsQuery,
  useDeleteManyBrandMutation,
} = brandsAPI;
