import ActionButton from "@/components/ActionButton";
import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import Forbidden from "@/components/Forbidden";
import { InventoryForm } from "@/components/Inventory/InventoryForm";
import Layout from "@/components/Layout";
import StyledTable from "@/components/StyledTable";
import { useAuth } from "@/hooks/useAuth";
import { removeItem, resetItemState } from "@/redux/features/itemSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCreateManyItemMutation } from "@/redux/services/itemsAPI";
import checkPermissions from "@/utils/checkPermissions";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useMemo, useState } from "react";
import { BsArrowLeft, BsBack, BsPlusCircle } from "react-icons/bs";
import { toast } from "react-toastify";

type Props = {};

const BulkCreateItem = (props: Props) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.items);
  const [modal, setModal] = useState<string>("");
  const [selectedId, setSelectedId] = useState("");
  const [createManyItem] = useCreateManyItemMutation();
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
        Header: "Date received",
        accessor: "date_received",
        Cell: (props: any) => (
          <div>{dayjs(props.value).format("MM-DD-YYYY")}</div>
        ),
      },
      {
        Header: "Expiry",
        accessor: "expiry_date",
        Cell: (props: any) => (
          <div>{dayjs(props.value).format("MM-DD-YYYY")}</div>
        ),
      },
      {
        Header: "Actions",
        Cell: (props: any) => (
          <div className="flex flex-row gap-3 min-w-fit ">
            <ActionButton
              data-modal="edit-virtual-item-modal"
              onClick={(e) => onModalOpen(e, props.row.original.id)}
              action="edit"
            />
            <ActionButton
              onClick={(e) =>
                dispatch(removeItem(Number(props.row.original.id)))
              }
              action="delete"
            />
          </div>
        ),
      },
    ],
    []
  );

  if (!checkPermissions(["create-item"], user.roles)) {
    return <Forbidden />;
  }
  return (
    <div className="px-6 py-6 flex flex-col gap-6">
      <div className=" max-w-fit">
        <Link href="/inventory/items" passHref>
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
      <InventoryForm className=" flex flex-col lg:flex-row gap-6" isBulkAdd>
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
                    let parsedEl = {
                      ...d,
                      category_id: d.category_id.value,
                      brand_id: d.brand_id.value,
                      company_id: d.company_id.value,
                      storage_location_id: d.storage_location_id.value,
                    };
                    return parsedEl;
                  });
                  try {
                    await createManyItem(parsedData);
                    toast.success("Items added successfully!");
                  } catch (error) {
                    toast.error("Error adding items.");
                  }
                  dispatch(resetItemState());
                  router.push("/inventory/items");
                } else {
                  toast.error("Please add an item to submit.", {
                    toastId: "no-item-added",
                  });
                }
              }}
            />
          </div>
        </div>
      </InventoryForm>
      <AppModal
        title="Edit Item"
        onClose={onModalClose}
        isOpen={modal === "edit-virtual-item-modal"}
      >
        <InventoryForm virtualId={selectedId} onClose={onModalClose} />
      </AppModal>
    </div>
  );
};

export default BulkCreateItem;
BulkCreateItem.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout icon={<BsPlusCircle />} title="Add Items">
      {page}
    </Layout>
  );
};
