import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "../components/Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  outline: true,
  colorScheme: "primary",
  label: "Button",
};

export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  outline: true,
  colorScheme: "secondary",
  label: "Button",
};

export const WarningOutline = Template.bind({});
WarningOutline.args = {
  outline: true,
  colorScheme: "warning",
  label: "Button",
};
export const DangerOutline = Template.bind({});
DangerOutline.args = {
  outline: true,
  colorScheme: "danger",
  label: "Button",
};

export const Primary = Template.bind({});
Primary.args = {
  colorScheme: "primary",
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  colorScheme: "secondary",
  label: "Button",
};

export const Warning = Template.bind({});
Warning.args = {
  colorScheme: "warning",
  label: "Button",
};
export const Danger = Template.bind({});
Danger.args = {
  colorScheme: "danger",
  label: "Button",
};

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Button",
//   color: "amber",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Button",
//   color: "amber",
// };
