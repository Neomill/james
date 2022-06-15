import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import SalesChart from "@/components/SalesChart";
import Stat from "@/components/Stat";
import StatGroup from "@/components/StatGroup";
import { selectCurrentUser } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useGetOverviewQuery } from "@/redux/services/overviewAPI";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { ReactElement } from "react";
import {
  BsBoxArrowLeft,
  BsCash,
  BsCheckCircleFill,
  BsCheckSquareFill,
  BsClockFill,
  BsExclamationTriangleFill,
  BsFillArchiveFill,
  BsFillXCircleFill,
  BsGraphDown,
  BsGraphUp,
  BsGrid1X2,
  BsPeopleFill,
  BsPlusCircleFill,
  BsReceipt,
} from "react-icons/bs";

const Dashboard = ({}) => {
  const { data, isLoading, error } = useGetOverviewQuery({});

  if (error) return <p>Ooops. Something went wrong!</p>;
  if (isLoading) {
    return <Loading />;
  }
  // const user = useAppSelector(selectCurrentUser);
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <StatGroup title="Total Product Inventory">
          <Stat
            color="text-violet-500"
            bg="bg-violet-50"
            variant="clean"
            label="Total Items"
            icon={<BsFillArchiveFill />}
          >
            {data.totalItems}
          </Stat>
          <Stat
            color="text-emerald-500"
            bg="bg-emerald-50"
            variant="clean"
            label="In Stock"
            icon={<BsCheckCircleFill />}
          >
            {data.totalInStockItems}
          </Stat>
          <Stat
            variant="clean"
            label="Low Stock Items"
            icon={<BsExclamationTriangleFill />}
            color="text-amber-500"
            bg="bg-amber-50"
          >
            {data.totalLowStockItems}
          </Stat>
          <Stat
            label="Out of stock Items"
            color="text-red-500"
            bg="bg-red-50"
            variant="clean"
            icon={<BsFillXCircleFill />}
          >
            {data.totalOutOfStockItems}
          </Stat>
        </StatGroup>
        <StatGroup title="Total Equipment Inventory">
          <Stat
            color="text-violet-500"
            bg="bg-violet-50"
            variant="clean"
            label="Revenue"
            icon={<BsGraphUp />}
          >
            ₱{numberWithCommas(Number(data.totalRevenue).toFixed(2))}
          </Stat>
          <Stat
            color={data.totalProfit > 0 ? "text-emerald-500" : "text-red-500"}
            bg={data.totalProfit > 0 ? "bg-emerald-50" : "bg-red-50"}
            variant="clean"
            label="Profit"
            icon={<BsCash />}
          >
            ₱{numberWithCommas(Number(data.totalProfit).toFixed(2))}
          </Stat>
          <Stat
            variant="clean"
            label="Cost"
            icon={<BsGraphDown />}
            color="text-amber-500"
            bg="bg-amber-50"
          >
            ₱{numberWithCommas(Number(data.totalCost).toFixed(2))}
          </Stat>
          <Stat
            label="Transactions"
            color="text-blue-500"
            bg="bg-blue-50"
            variant="clean"
            icon={<BsReceipt />}
          >
            {data.totalTransactions}
          </Stat>
        </StatGroup>
        <StatGroup title="Total Sales Order">
          <Stat
            color="text-violet-500"
            bg="bg-violet-50"
            variant="clean"
            label="Revenue"
            icon={<BsGraphUp />}
          >
            ₱{numberWithCommas(Number(data.totalRevenue).toFixed(2))}
          </Stat>
          <Stat
            color={data.totalProfit > 0 ? "text-emerald-500" : "text-red-500"}
            bg={data.totalProfit > 0 ? "bg-emerald-50" : "bg-red-50"}
            variant="clean"
            label="Profit"
            icon={<BsCash />}
          >
            ₱{numberWithCommas(Number(data.totalProfit).toFixed(2))}
          </Stat>
          <Stat
            variant="clean"
            label="Cost"
            icon={<BsGraphDown />}
            color="text-amber-500"
            bg="bg-amber-50"
          >
            ₱{numberWithCommas(Number(data.totalCost).toFixed(2))}
          </Stat>
          <Stat
            label="Transactions"
            color="text-blue-500"
            bg="bg-blue-50"
            variant="clean"
            icon={<BsReceipt />}
          >
            {data.totalTransactions}
          </Stat>
        </StatGroup>
        <StatGroup title="Total invoices">
          <Stat
            color="text-violet-500"
            bg="bg-violet-50"
            variant="clean"
            label="Revenue"
            icon={<BsGraphUp />}
          >
            ₱{numberWithCommas(Number(data.totalRevenue).toFixed(2))}
          </Stat>
          <Stat
            color={data.totalProfit > 0 ? "text-emerald-500" : "text-red-500"}
            bg={data.totalProfit > 0 ? "bg-emerald-50" : "bg-red-50"}
            variant="clean"
            label="Profit"
            icon={<BsCash />}
          >
            ₱{numberWithCommas(Number(data.totalProfit).toFixed(2))}
          </Stat>
          <Stat
            variant="clean"
            label="Cost"
            icon={<BsGraphDown />}
            color="text-amber-500"
            bg="bg-amber-50"
          >
            ₱{numberWithCommas(Number(data.totalCost).toFixed(2))}
          </Stat>
          <Stat
            label="Transactions"
            color="text-blue-500"
            bg="bg-blue-50"
            variant="clean"
            icon={<BsReceipt />}
          >
            {data.totalTransactions}
          </Stat>
        </StatGroup>
        <StatGroup title="Total Received Po">
          <Stat
            color="text-violet-500"
            bg="bg-violet-50"
            variant="clean"
            label="Revenue"
            icon={<BsGraphUp />}
          >
            ₱{numberWithCommas(Number(data.totalRevenue).toFixed(2))}
          </Stat>
          <Stat
            color={data.totalProfit > 0 ? "text-emerald-500" : "text-red-500"}
            bg={data.totalProfit > 0 ? "bg-emerald-50" : "bg-red-50"}
            variant="clean"
            label="Profit"
            icon={<BsCash />}
          >
            ₱{numberWithCommas(Number(data.totalProfit).toFixed(2))}
          </Stat>
          <Stat
            variant="clean"
            label="Cost"
            icon={<BsGraphDown />}
            color="text-amber-500"
            bg="bg-amber-50"
          >
            ₱{numberWithCommas(Number(data.totalCost).toFixed(2))}
          </Stat>
          <Stat
            label="Transactions"
            color="text-blue-500"
            bg="bg-blue-50"
            variant="clean"
            icon={<BsReceipt />}
          >
            {data.totalTransactions}
          </Stat>
        </StatGroup>
        <StatGroup title="Total Pull Out Request">
          <Stat
            color="text-violet-500"
            bg="bg-violet-50"
            variant="clean"
            label="Revenue"
            icon={<BsGraphUp />}
          >
            ₱{numberWithCommas(Number(data.totalRevenue).toFixed(2))}
          </Stat>
          <Stat
            color={data.totalProfit > 0 ? "text-emerald-500" : "text-red-500"}
            bg={data.totalProfit > 0 ? "bg-emerald-50" : "bg-red-50"}
            variant="clean"
            label="Profit"
            icon={<BsCash />}
          >
            ₱{numberWithCommas(Number(data.totalProfit).toFixed(2))}
          </Stat>
          <Stat
            variant="clean"
            label="Cost"
            icon={<BsGraphDown />}
            color="text-amber-500"
            bg="bg-amber-50"
          >
            ₱{numberWithCommas(Number(data.totalCost).toFixed(2))}
          </Stat>
          <Stat
            label="Transactions"
            color="text-blue-500"
            bg="bg-blue-50"
            variant="clean"
            icon={<BsReceipt />}
          >
            {data.totalTransactions}
          </Stat>
        </StatGroup>
        <StatGroup title="Completed Orders">
          <Stat
            color="text-violet-500"
            bg="bg-violet-50"
            variant="clean"
            label="Revenue"
            icon={<BsGraphUp />}
          >
            ₱{numberWithCommas(Number(data.totalRevenue).toFixed(2))}
          </Stat>
          <Stat
            color={data.totalProfit > 0 ? "text-emerald-500" : "text-red-500"}
            bg={data.totalProfit > 0 ? "bg-emerald-50" : "bg-red-50"}
            variant="clean"
            label="Profit"
            icon={<BsCash />}
          >
            ₱{numberWithCommas(Number(data.totalProfit).toFixed(2))}
          </Stat>
          <Stat
            variant="clean"
            label="Cost"
            icon={<BsGraphDown />}
            color="text-amber-500"
            bg="bg-amber-50"
          >
            ₱{numberWithCommas(Number(data.totalCost).toFixed(2))}
          </Stat>
          <Stat
            label="Transactions"
            color="text-blue-500"
            bg="bg-blue-50"
            variant="clean"
            icon={<BsReceipt />}
          >
            {data.totalTransactions}
          </Stat>
        </StatGroup>
        <StatGroup title="Total Current Sales">
          <Stat
            color="text-violet-500"
            bg="bg-violet-50"
            variant="clean"
            label="Revenue"
            icon={<BsGraphUp />}
          >
            ₱{numberWithCommas(Number(data.totalRevenue).toFixed(2))}
          </Stat>
          <Stat
            color={data.totalProfit > 0 ? "text-emerald-500" : "text-red-500"}
            bg={data.totalProfit > 0 ? "bg-emerald-50" : "bg-red-50"}
            variant="clean"
            label="Profit"
            icon={<BsCash />}
          >
            ₱{numberWithCommas(Number(data.totalProfit).toFixed(2))}
          </Stat>
          <Stat
            variant="clean"
            label="Cost"
            icon={<BsGraphDown />}
            color="text-amber-500"
            bg="bg-amber-50"
          >
            ₱{numberWithCommas(Number(data.totalCost).toFixed(2))}
          </Stat>
          <Stat
            label="Transactions"
            color="text-blue-500"
            bg="bg-blue-50"
            variant="clean"
            icon={<BsReceipt />}
          >
            {data.totalTransactions}
          </Stat>
        </StatGroup>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <StatGroup title="All Branches">
          <Stat
            color="text-emerald-500"
            bg="bg-emerald-50"
            variant="solid"
            label="Good Condition"
            icon={<BsCheckSquareFill />}
          >
            {data.totalGoodConditionItems}
          </Stat>
          <Stat
            color="text-red-500"
            bg="bg-red-50"
            variant="solid"
            label="Expired Items"
            icon={<BsClockFill />}
          >
            {data.totalExpiredItems}
          </Stat>
        </StatGroup>
      </div>
      {/* <div className="grid grid-cols-1 ">
        <SalesChart title="Sales and Purchase Statistics (Under Construction)" />
      </div> */}
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout bg="transparent" icon={<BsGrid1X2 />} title="Dashboard">
      {page}
    </Layout>
  );
};
