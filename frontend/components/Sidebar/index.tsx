import React from "react";
import SidebarLinkItem, { SidebarItemProps } from "../SidebarLinkItem";
import Image from 'next/image';
import logosrc from "/public/logo.png";

type Props = {
  links: Array<SidebarItemProps>;
};
const Sidebar = ({ links }: Props) => {
  return (
<<<<<<< HEAD
    <div className="bg-green-500 fixed hidden md:flex flex-col w-64 h-screen border-r-1 border-gray-50">
      <div className=" bg-zinc-900 border-b-2 border-zinc-500 ">
        <Image src="{logosrc}" alt="Logo" width="50px" height="50px" layout="responsive"/>
        <h1 className="text-white text-xl font-bold">McPoultry</h1>
=======
    <div className=" bg-green-500 fixed hidden md:flex flex-col w-64 h-screen border-r-2 border-gray-50">
      <div className=" bg-white pl-9 border-b-2 border-blue-50 ">
        <h1 className="text-amber-500 text-xl font-bold">
          <img src="/chicken.png" alt="James Hatchery" className="h-20"/>
        </h1>
>>>>>>> main
      </div>
      <ul className="bg-zinc-900 h-full overflow-y-auto  pt-6  pb-10 flex flex-col gap-6">
        {links.map((link) => (
          <SidebarLinkItem key={link.href} {...link} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
