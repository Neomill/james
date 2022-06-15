import React from "react";
import SidebarLinkItem, { SidebarItemProps } from "../SidebarLinkItem";
import Image from 'next/image';
import logosrc from "/public/logo.png";

type Props = {
  links: Array<SidebarItemProps>;
};
const Sidebar = ({ links }: Props) => {
  return (
    <div className="bg-green-500 fixed hidden md:flex flex-col w-64 h-screen border-r-2 border-gray-50">
      <div className="bg-zinc-900 w-full h-40 flex flex-row items-center pl-14">
          <img src="/chicken.png" alt="James Hatchery" className="h-20"/>
      </div>
      <ul className="bg-zinc-900 h-full pt-2 pb-10 flex flex-col gap-6
      scrollbar-thin scrollbar-thumb-custom-zincmedium scrollbar-track-custom-zincmediumdark overflow-y-scroll">
        {links.map((link) => (
          <SidebarLinkItem key={link.href} {...link} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
