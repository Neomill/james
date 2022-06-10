import { EmployeeProps } from "@/components/Employee/EmployeeDetails";
import { reduxAPI } from "./reduxAPI";

const employeesAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<
      { body: EmployeeProps[]; totalPages: number },
      { page: number }
    >({
      query: (arg) => {
        const { page = 0 } = arg;
        return {
          url: "/employee",
          params: { page },
        };
      },
      providesTags: ["Employee"],
    }),
    searchEmployees: builder.query<
      { body: EmployeeProps[]; totalPages: number },
      { page: number; query: string; order?: number }
    >({
      query: (arg) => {
        const { page = 0, query = "", order = 0, ...rest } = arg;
        return {
          url: "/employee/search",
          params: { page, query, order, ...rest },
        };
      },
      providesTags: ["Employee"],
    }),
    getEmployeeById: builder.query<EmployeeProps, string>({
      query: (id) => `/employee/${id}`,
      providesTags: ["Employee"],
    }),
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/employee/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Employee", "PORequest"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee", "PORequest"],
    }),
    deleteManyEmployee: builder.mutation({
      query: (data) => ({
        url: "/employee/bulk",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Employee", "PORequest"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllEmployeesQuery,
  useCreateEmployeeMutation,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useSearchEmployeesQuery,
  useDeleteManyEmployeeMutation,
} = employeesAPI;
