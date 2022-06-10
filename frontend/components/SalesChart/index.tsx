import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
type Props = {
  title: string;
};

const SalesChart = ({ title }: Props) => {
  const data = [
    {
      name: "Jan",
      sales: 4000,
      purchase: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      sales: 3000,
      purchase: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      sales: 2000,
      purchase: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      sales: 2780,
      purchase: 3908,
      amt: 2000,
    },
    {
      name: "May",
      sales: 1890,
      purchase: 4800,
      amt: 2181,
    },
    {
      name: "Apr",
      sales: 2390,
      purchase: 3800,
      amt: 2500,
    },
    {
      name: "May",
      sales: 3490,
      purchase: 4300,
      amt: 2100,
    },
  ];
  return (
    <div
      style={{ height: "500px" }}
      className="w-full  bg-white pt-6 pb-9 rounded-lg px-6"
    >
      <div>
        <h1>{title}</h1>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize={12} dataKey="name" />
          <YAxis fontSize={12} />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="purchase"
            stroke="#2563eb"
            fill="#93c5fd"
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#0ea5e9"
            fill="#7dd3fc"
            stackId="1"
          />
          {/* <Line
            type="monotone"
            dataKey="purchase"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="sales" stroke="#82ca9d" /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
