import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";
import { link } from "fs";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import {
  BsBox,
  BsBoxArrowLeft,
  BsBoxSeam,
  BsBuilding,
  BsCardList,
  BsCircle,
  BsExclamationTriangle,
  BsFiles,
  BsGear,
  BsGeo,
  BsGrid1X2,
  BsListUl,
  BsMenuApp,
  BsPeople,
  BsPersonBadge,
  BsReceipt,
  BsPlusCircle,
  BsTag,
  BsCart,
  BsReceiptCutoff,
  BsReception0,
  BsReception1,
  BsReception3,
  BsShop,
} from "react-icons/bs";
import Header from "../Header";
import Loading from "../Loading";
import Sidebar from "../Sidebar";
import styles from "./Layout.module.scss";

type Props = {
  title: string;
  children: ReactNode;
  icon: any;
  bg?: string;
};

export const links = [
  {
    icon: <BsGrid1X2 />,
    label: "Dashboard",
    href: "/",
    permission: "read-dashboard",
  },
  {
    icon: <BsShop />,
    label: "Point of Sale",
    href: "/pos",
    disabled: true,
    permission: "read-order",
    children: [
      {
        icon: <BsCart />,
        label: "Orders",
        href: "/pos/invoices",
        permission: "read-order",
      },
      {
        icon: <BsPlusCircle />,
        label: "Add New Order",
        href: "/pos/add-order",
        permission: "create-order",
      },
      {
        icon: <BsReceipt />,
        label: "Transactions",
        href: "/pos/transactions",
        permission: "read-transaction",
      },
    ],
  },
  {
    icon: <BsCardList />,
    label: "Menu",
    href: "/menu",
    disabled: true,
    permission: "read-menu-item",
    children: [
      {
        icon: <BsBox />,
        label: "Items",
        href: "/menu/items",
        permission: "read-menu-item",
      },
      {
        icon: <BsPlusCircle />,
        label: "Add Menu",
        href: "/menu/bulk-add",
        permission: "read-menu-item",
      },
      {
        icon: <BsListUl />,
        label: "Categories",
        href: "/menu/categories",
        permission: "read-menu-item-category",
      },
    ],
  },

  {
    icon: <BsBoxSeam />,
    label: "Inventory",
    href: "/inventory",
    disabled: true,
    permission: "read-item",

    children: [
      {
        icon: <BsBox />,
        label: "Items",
        href: "/inventory/items",
        permission: "read-item",
      },
      {
        icon: <BsPlusCircle />,
        label: "Add Items",
        href: "/inventory/bulk-add",
      },
      {
        icon: <BsListUl />,
        label: "Categories",
        href: "/inventory/categories",
        permission: "read-category",
      },
      {
        icon: <BsTag />,
        label: "Brands",
        href: "/inventory/brands",
        permission: "read-brand",
      },
      {
        icon: <BsReceipt />,
        label: "History",
        href: "/inventory/history",
        permission: "read-item",
      },
    ],
  },
  {
    icon: <BsBoxArrowLeft />,
    label: "Pull-out Requests",
    href: "/po-requests",
    permission: "read-po-request",
  },
  {
    icon: <BsBuilding />,
    label: "Suppliers",
    href: "/companies",
    permission: "read-supplier",
  },
  {
    icon: <BsGeo />,
    label: "Storage Locations",
    href: "/storage-locations",
    permission: "read-storage-location",
  },
  {
    icon: <BsPeople />,
    label: "Employees",
    href: "/employees",
    permission: "read-employee",
  },
  {
    icon: <BsPersonBadge />,
    label: "Positions",
    href: "/positions",
    permission: "read-position",
  },
  {
    icon: <BsGear />,
    label: "Settings",
    href: "/settings",
    permission: "read-settings",
  },
];

const Layout: React.FC<Props> = ({
  title = "Shydan",
  icon = <BsBoxSeam />,
  children,
  bg = "white",
}) => {
  const { pathname } = useRouter();
  // let activeLink = links.find((link) => link.href == pathname) || links[1];
  const router = useRouter();
  const { user } = useAuth();
  if (!user) {
    router.push("/auth/sign-in");
  } else {
    const permittedLinks = links.filter((link) =>
      user.roles.some((role: any) =>
        role?.permissions?.some(
          (permission: any) => permission.name === link.permission
        )
      )
    );

    return (
      <>
        <div className="flex flex-row h-screen">
          <Sidebar links={permittedLinks} />
          <div className="md:ml-64 w-full overflow-x-auto flex flex-col">
            <div className={`${styles["calculated-width"]} fixed top-0`}>
              <Header title={title} icon={icon} name={user?.username} />
            </div>
            <div className="mt-20 overflow-y-auto md:mt-20 bg-gray-50 h-auto min-h-content p-6">
              <div className={`bg-${bg} w-full flex flex-col gap-3 rounded-lg`}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <Loading title="Checking credentials" message="Loading, please wait..." />
  );
};

export default Layout;
