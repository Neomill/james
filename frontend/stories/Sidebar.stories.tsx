import { ComponentMeta, ComponentStory } from '@storybook/react';
import Sidebar from '../components/Sidebar';
import { BsBoxSeam, BsGear, BsGrid1X2, BsPeople, BsReceipt } from 'react-icons/bs';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: [ {
    icon:<BsGrid1X2 />,
    label:"Dashboard",
    href:"/"
  },
  {
    icon:<BsBoxSeam />,
    label:"Inventory",
    active:true,
    href:"/inventory"
  },
  {
    icon:<BsPeople />,
    label:"Employees",
    href:"/employees"
  },
  {
    icon:<BsReceipt />,
    label:"Orders",
    href:"/orders"
  },
  
  {
    icon:<BsGear />,
    label:"Settings",
    href:"/settings"
  },]
}



