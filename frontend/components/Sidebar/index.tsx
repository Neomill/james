import React from "react";
import SidebarLinkItem, { SidebarItemProps } from "../SidebarLinkItem";
type Props = {
  links: Array<SidebarItemProps>;
};
const Sidebar = ({ links }: Props) => {
  return (
    <div className=" bg-green-500 fixed hidden md:flex flex-col w-64 h-screen border-r-2 border-gray-50">
      <div className=" bg-white py-4 pl-9 border-b-2 border-blue-50 ">
        <h1 className="text-blue-500 text-xl font-bold">Shydan</h1>
      </div>
      <ul className="bg-white h-full overflow-y-auto  pt-6  pb-10 flex flex-col gap-6 pl-6 pr-6">
        {links.map((link) => (
          <SidebarLinkItem key={link.href} {...link} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
