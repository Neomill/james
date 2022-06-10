import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ImageUpload from "../components/ImageUpload";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/ImageUpload",
  component: ImageUpload,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ImageUpload>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ImageUpload> = (args) => (
  <ImageUpload {...args} />
);

export const ImageUploadArg = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ImageUploadArg.args = {};
