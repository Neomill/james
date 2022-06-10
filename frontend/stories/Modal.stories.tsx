import { ComponentMeta, ComponentStory } from "@storybook/react";
import AppModal from "../components/AppModal";

export default {
  title: "Components/AppModal",
  component: AppModal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AppModal>;

const Template: ComponentStory<typeof AppModal> = (args) => (
  <AppModal {...args} />
);

export const Default = Template.bind({});
Default.args = {};
