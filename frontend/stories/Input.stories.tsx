import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Input from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { action } from "@storybook/addon-actions";
import { VFC, ReactNode, FC } from "react";
import { StoryFnReactReturnType } from "@storybook/react/dist/ts3.9/client/preview/types";

const StorybookFormProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(action("[React Hooks Form] Submit"))}
      >
        {children}
      </form>
    </FormProvider>
  );
};
//TODO
export const withRHF =
  (showSubmitButton: boolean) =>
  (Story: FC): StoryFnReactReturnType =>
    (
      <StorybookFormProvider>
        <Story />
      </StorybookFormProvider>
    );

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Input",
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [withRHF(false)],
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {
  border: "",
  type: "text",
  label: "Firstname",
  placeholder: "Enter You Firstname",
  labelColor: "info",
};

export const File = Template.bind({});
File.args = {
  border: "",
  type: "file",
  label: "Firstname",
  placeholder: "Profile",
  labelColor: "info",
};
export const Password = Template.bind({});
Password.args = {
  border: "bottom",
  type: "password",
  label: "Firstname",
  placeholder: "Profile",
  labelColor: "info",
};
