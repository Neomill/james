import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Select from "../components/Select/index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Select",
  component: Select,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Select>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const SelectCon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SelectCon.args = {
  options: [
    { id: "1", label: "hello1" },
    { id: "1", label: "hello1" },
    { id: "1", label: "hello1" },
  ],
  label: "hello",
};
