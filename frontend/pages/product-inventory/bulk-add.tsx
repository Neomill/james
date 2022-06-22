import ActionButton from "@/components/ActionButton";
import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import Forbidden from "@/components/Forbidden";
import Layout from "@/components/Layout";
import { MenuItemForm } from "@/components/MenuItem/MenuItemForm";
import StyledTable from "@/components/StyledTable";
import { useAuth } from "@/hooks/useAuth";
import { removeItem } from "@/redux/features/itemSlice";
import {
  removeMenuItem,
  resetMenuItemState,
} from "@/redux/features/menuItemSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useCreateManyMenuItemMutation,
  useCreateMenuItemMutation,
} from "@/redux/services/menuItemsAPI";
import checkPermissions from "@/utils/checkPermissions";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useMemo, useState } from "react";
import { BsArrowLeft, BsPlusCircle } from "react-icons/bs";
import { toast } from "react-toastify";

type Props = {};

const BulkCreateMenuItem = (props: Props) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.menuItems);
  const [modal, setModal] = useState<string>("");
  const [selectedId, setSelectedId] = useState("");
  const [createManyMenuItem] = useCreateManyMenuItemMutation();
  const [createMenuItem] = useCreateMenuItemMutation();
  const { user } = useAuth();
  const router = useRouter();

  const onModalOpen = (event, id?) => {
    event.preventDefault();
    const modal = event.currentTarget.getAttribute("data-modal");

    if (id) {
      setSelectedId(id);
    }
    if (modal) setModal(modal);
  };

  const onModalClose = () => {
    setModal("");
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Qty",
        accessor: "qty",
      },
      {
        Header: "Cost Price",
        accessor: "cost_price",
      },
      {
        Header: "Selling Price",
        accessor: "selling_price",
      },
      {
        Header: "Category",
        accessor: "menu_item_category_id.label",
      },
      {
        Header: "Actions",
        Cell: (props: any) => (
          <div className="flex flex-row gap-3 min-w-fit ">
            <ActionButton
              data-modal="edit-virtual-menu-item-modal"
              onClick={(e) => onModalOpen(e, props.row.original.id)}
              action="edit"
            />
            <ActionButton
              onClick={(e) =>
                dispatch(removeMenuItem(Number(props.row.original.id)))
              }
              action="delete"
            />
          </div>
        ),
      },
    ],
    []
  );

  if (!checkPermissions(["create-menu-item"], user.roles)) {
    return <Forbidden />;
  }
  return (
    <div className="px-6 py-6 flex flex-col gap-6">
      <div className=" max-w-fit">
        <Link href="/product-inventory/items" passHref>
          <a>
            <Button
              icon={<BsArrowLeft />}
              outline
              size="medium"
              label="Go Back"
            />
          </a>
        </Link>
      </div>
      <hr />
      <MenuItemForm className=" flex flex-col lg:flex-row gap-6" isBulkAdd>
        <div className="border lg:w-7/12 h-12/12 bg-white rounded-lg flex flex-col justify-between">
          <div className=" text-xs mt-3 overflow-y-auto">
            <StyledTable
              minH="100%"
              fontSize="text-xs"
              noCheckbox
              columns={columns}
              data={data}
            />
          </div>
          {data.length < 1 && (
            <div className="self-center">No data available.</div>
          )}

          <div className="m-4 flex flex-col  justify-end md:flex-row gap-3 mt-6">
            <Button
              type="submit"
              width="wide"
              size="medium"
              label="Submit"
              onClick={async () => {
                if (data.length > 0) {
                  let parsedData = data.map((d) => {
                    const formData = new FormData();
                    formData.append("image", d.image[0]);
                    formData.append(
                      "menu_item_category_id",
                      d.menu_item_category_id.value
                    );
                    for (var key in d) {
                      formData.append(key, d[key]);
                    }
                    return formData;
                  });
                  try {
                    for (const menuItem of parsedData) {
                      await createMenuItem(menuItem).unwrap();
                    }
                    toast.success("Items added successfully!");
                  } catch (error) {
                    toast.error("Error adding items.");
                  }
                  dispatch(resetMenuItemState());
                  router.push("/product-inventory/items");
                } else {
                  toast.error("Please add an item to submit.", {
                    toastId: "no-menu-item-added",
                  });
                }
              }}
            />
          </div>
        </div>
      </MenuItemForm>
      <AppModal
        title="Edit Item"
        onClose={onModalClose}
        isOpen={modal === "edit-virtual-menu-item-modal"}
      >
        <MenuItemForm virtualId={selectedId} onClose={onModalClose} />
      </AppModal>
    </div>
  );
};

export default BulkCreateMenuItem;
BulkCreateMenuItem.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout icon={<BsPlusCircle />} title="Add Product">
      {page}
    </Layout>
  );
};
