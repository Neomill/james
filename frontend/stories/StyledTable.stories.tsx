import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "../components/Button";
import StyledTable from "../components/StyledTable";

export default {
  title: "Components/StyledTable",
  component: StyledTable,
} as ComponentMeta<typeof StyledTable>;

const Template: ComponentStory<typeof StyledTable> = (args) => (
  <StyledTable {...args} />
);

const data = [
  {
    id: 1,
    name: "Hello",
    qty: 2,
    category: {
      name: "Category 1",
    },
    company: {
      name: "Company 1",
    },
    storage_location: {
      name: "Location 1",
    },
    brand: {
      name: "Brand 1",
    },
    date_received: "11/20/2020",
    expiry_date: "03/13/2022",
  },
  {
    id: 2,
    name: "Hello",
    qty: 2,
    category: {
      name: "Category 1",
    },
    company: {
      name: "Company 1",
    },
    storage_location: {
      name: "Location 1",
    },
    brand: {
      name: "Brand 1",
    },
    date_received: "11/20/2020",
    expiry_date: "03/13/2022",
  },
  {
    id: 3,
    name: "Hello",
    qty: 2,
    category: {
      name: "Category 1",
    },
    company: {
      name: "Company 1",
    },
    storage_location: {
      name: "Location 1",
    },
    brand: {
      name: "Brand 1",
    },
    date_received: "11/20/2020",
    expiry_date: "03/13/2022",
  },
];
const columns = [
  {
    Header: "#",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Qty",
    accessor: "qty",
  },
  {
    Header: "Category",
    accessor: "category.name",
  },
  {
    Header: "Company",
    accessor: "company.name",
  },
  {
    Header: "Location",
    accessor: "storage_location.name",
  },
  {
    Header: "Brand",
    accessor: "brand.name",
  },
  {
    Header: "Date received",
    accessor: "date_received",
  },
  {
    Header: "Expiry",
    accessor: "expiry_date",
  },
  {
    Header: "Actions",
    Cell: (props: any) => (
      <div className="flex flex-row gap-3">
        <Button pill outline colorScheme="warning" label="Edit" />
        <Button pill outline colorScheme="danger" label="Delete" />
      </div>
    ),
  },
];

export const Default = Template.bind({});
Default.args = {
  columns,
  data,
};
