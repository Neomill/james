import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import  SidebarLinkItem  from '../components/SidebarLinkItem';
import { BsBoxSeam, BsGear} from 'react-icons/bs'

export default {
  title: 'Components/SidebarLinkItem',
  component: SidebarLinkItem,
} as ComponentMeta<typeof SidebarLinkItem>;

const Template: ComponentStory<typeof SidebarLinkItem> = (args) => <SidebarLinkItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon:<BsBoxSeam />,
  label:"Inventory"
}
export const Active = Template.bind({})
Active.args = {
  ...Default.args,
  active:true,
}

