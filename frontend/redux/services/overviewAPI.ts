import { reduxAPI } from "./reduxAPI";

const overviewAPI = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query<
      {
        totalItems: number;
        totalInStockItems: number;
        totalLowStockItems: number;
        totalOutOfStockItems: number;
        totalGoodConditionItems: number;
        totalExpiredItems: number;
        totalNoOfPurchase: number;
        totalPullout: number;
        totalCustomers: number;
        totalSuppliers: number;
        totalRevenue: number;
        totalCost: number;
        totalProfit: number;
        totalTransactions: number;
        totalequipment:any,
        totalequipmentitems :number,
        totalequipmentSum :any,
      },
      {}
    >({
      query: (arg) => {
        return {
          url: "/overview",
        };
      },
      providesTags: ["Overview"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetOverviewQuery } = overviewAPI;
