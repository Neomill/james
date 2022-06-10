import { ComponentMeta, ComponentStory } from "@storybook/react";
import ActionTableMenu from "../components/ActionTableMenu";

export default {
  title: "Components/ActionTableMenu",
  component: ActionTableMenu,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ActionTableMenu>;

const Template: ComponentStory<typeof ActionTableMenu> = (args) => (
  <ActionTableMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Inventory Items",
};
