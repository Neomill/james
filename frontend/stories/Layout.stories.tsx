import { ComponentMeta, ComponentStory } from '@storybook/react';
import Layout from '../components/Layout';

export default {
  title: 'Layouts/Administrator',
  component: Layout,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
}



