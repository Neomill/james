import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Dropdown from "../components/Dropdown";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const options = [
  {
    title: "Type",
    sub_options: [
      {
        title: "Pending",
      },
      {
        title: "Approved",
      },
      {
        title: "Cancelled",
      },
    ],
  },
  {
    title: "Date",
    sub_options: [
      {
        title: "Date created",
      },
      {
        title: "Updated at",
      },
    ],
  },
];

export const Primary = Template.bind({});
Primary.args = {
  label: "Filter",
  options,
};

export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  outline: true,
  colorScheme: "primary",
  ...Primary.args,
};

export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  outline: true,
  colorScheme: "secondary",
  ...Primary.args,
};

export const WarningOutline = Template.bind({});
WarningOutline.args = {
  outline: true,
  colorScheme: "warning",
  ...Primary.args,
};
export const DangerOutline = Template.bind({});
DangerOutline.args = {
  outline: true,
  colorScheme: "danger",
  ...Primary.args,
};

export const Secondary = Template.bind({});
Secondary.args = {
  colorScheme: "secondary",
  ...Primary.args,
};

export const Warning = Template.bind({});
Warning.args = {
  colorScheme: "warning",
  ...Primary.args,
};
export const Danger = Template.bind({});
Danger.args = {
  colorScheme: "danger",
  ...Primary.args,
};
