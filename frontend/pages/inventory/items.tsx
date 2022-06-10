import ActionButton from "@/components/ActionButton";
import ActionTableMenu from "@/components/ActionTableMenu";
import BulkOperations from "@/components/BulkOperations";
import { Button } from "@/components/Button";
import Forbidden from "@/components/Forbidden";
import InventoryModalManager from "@/components/Inventory/InventoryModalManager";
import { ItemCondition } from "@/components/Inventory/ItemDetails";
import { ItemTransactionProps } from "@/components/ItemTransaction/ItemTransactionDetails";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import StyledTable from "@/components/StyledTable";
import Tag from "@/components/Tag";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";
import {
  useDeleteItemMutation,
  useSearchItemsQuery,
} from "@/redux/services/itemsAPI";
import checkPermissions from "@/utils/checkPermissions";
import {
  itemConditionColorPicker,
  itemConditionText,
  itemStatusColorPicker,
  itemStatusText,
} from "@/utils/itemHelper";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsBoxSeam, BsPlusCircle } from "react-icons/bs";
import { toast } from "react-toastify";
const Inventory = () => {
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState<string>("");
  const [selectedId, setSelectedId] = useState("");
  const { filters, sortBy } = useAppSelector((state) => state.filters);
  const router = useRouter();
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchItemsQuery({
    page,
    query,
    ...filters,
    ...sortBy,
  });

  useEffect(() => {
    if (data?.totalPages < 0) {
      setPage(0);
    } else if (page > data?.totalPages) {
      setPage(data.totalPages);
    }

    return () => {};
  }, [filters, data]);

  const methods = useForm();
  const onSubmitSearch = (data) => {
    setPage(0);
    setQuery(data.search);
  };
  //---
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
  const [deleteItem] = useDeleteItemMutation();
  const [selectedItems, setSelectedItems] = useState([]);

  const onConfirmDelete = async () => {
    toast.promise(deleteItem(selectedId).unwrap(), {
      pending: "Deleting item...",
      error: "Error deleting item!",
      success: "Item deleted successfully!",
    });
    setSelectedId("");
    onModalClose();
  };

  const filterOptions = useMemo(
    () => [
      {
        title: "Status",
        selector: "status",
        sub_options: [
          {
            title: "All",
            value: "",
          },
          {
            title: "In Stock",
            value: "IN_STOCK",
          },
          {
            title: "Low Stock",
            value: "LOW_STOCK",
          },
          {
            title: "Out of Stock",
            value: "OUT_OF_STOCK",
          },
        ],
      },
      // {
      //   title: "Condition",
      //   selector: "condition",
      //   sub_options: [
      //     {
      //       title: "All",
      //       value: "",
      //     },
      //     {
      //       title: "Expired",
      //       value: "EXPIRED",
      //     },
      //     {
      //       title: "Good",
      //       value: "GOOD",
      //     },
      //   ],
      // },
    ],
    []
  );

  const sortOptions = useMemo(
    () => [
      {
        title: "Sort By",
        selector: "sortBy",
        selectedOption: { selector: "createdAt", value: 1 },
        sub_options: [
          {
            title: "ID #: Asc - Desc",
            value: { selector: "id", value: 0 },
          },
          {
            title: "ID #: Desc - Asc",
            value: { selector: "id", value: 1 },
          },
          {
            title: "Name: A-Z",
            value: { selector: "name", value: 0 },
          },
          {
            title: "Name: Z-A",
            value: { selector: "name", value: 1 },
          },
          {
            title: "Quantity: Low to High",
            value: { selector: "qty", value: 0 },
          },
          {
            title: "Quantity: High to Low",
            value: { selector: "qty", value: 1 },
          },
          {
            title: "Cost Price: Low to High",
            value: { selector: "price", value: 0 },
          },
          {
            title: "Cost Price: High to Low",
            value: { selector: "price", value: 1 },
          },
          {
            title: "Last Created",
            value: { selector: "createdAt", value: 1 },
          },
          {
            title: "Last Updated",
            value: { selector: "updatedAt", value: 1 },
          },
          {
            title: "Last Received",
            value: { selector: "date_received", value: 1 },
          },
        ],
      },
    ],
    []
  );

  const columns = useMemo<any>(
    () => [
      {
        Header: "#",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Brand",
        accessor: "brand.name",
        Cell: (props: any) => <div>{props.value || "N/A"}</div>,
      },
      {
        Header: "Qty",
        accessor: "qty",
      },
      {
        Header: "Cost Price",
        accessor: "cost_price",
        Cell: (props: any) => <div>₱{numberWithCommas(props.value)}</div>,
      },
      {
        Header: "Selling Price",
        accessor: "selling_price",
        Cell: (props: any) => <div>₱{numberWithCommas(props.value)}</div>,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (props: any) => (
          <Tag tailwindColor={itemStatusColorPicker(props.value)}>
            {itemStatusText(props.value)}
          </Tag>
        ),
      },
      {
        Header: "Condition",
        Cell: (props: any) => {
          const containsExpired = props.row.original.item_transactions.some(
            (i: ItemTransactionProps) => i.condition === "EXPIRED"
          );
          let condition: ItemCondition = containsExpired
            ? ItemCondition.EXPIRED
            : ItemCondition.GOOD;
          return (
            <Tag tailwindColor={itemConditionColorPicker(condition)}>
              {itemConditionText(condition)}
            </Tag>
          );
        },
      },
      {
        Header: "Actions",
        Cell: (props: any) => (
          <div className="flex justify-center items-center flex-row gap-4 min-w-fit">
            {checkPermissions(["update-item"], user.roles) && (
              <ActionButton
                data-modal="restock-item-modal"
                onClick={(e) => onModalOpen(e, props.row.original.id)}
                action="add"
              />
            )}
            {checkPermissions(["create-po-request"], user.roles) && (
              <ActionButton
                data-modal="single-pull-out-item-modal"
                onClick={(e) => onModalOpen(e, props.row.original.id)}
                action="pull-out"
              />
            )}
            <ActionButton
              data-modal="view-item-modal"
              onClick={(e) => onModalOpen(e, props.row.original.id)}
              action="view"
            />
            {checkPermissions(["update-item"], user.roles) && (
              <ActionButton
                data-modal="edit-item-modal"
                onClick={(e) => onModalOpen(e, props.row.original.id)}
                action="edit"
              />
            )}
            {checkPermissions(["delete-item"], user.roles) && (
              <ActionButton
                data-modal="delete-item-modal"
                onClick={(e) => onModalOpen(e, props.row.original.id)}
                action="delete"
              />
            )}
          </div>
        ),
      },
    ],
    []
  );
  if (!checkPermissions(["read-item"], user.roles)) {
    return <Forbidden />;
  }
  if (error) return <p>Ooops. Something went wrong!</p>;
  if (isLoading) return <Loading />;

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitSearch)}>
          <ActionTableMenu
            sortOptions={sortOptions}
            filterOptions={filterOptions}
            title="List of Items"
            onSubmit={onSubmitSearch}
            operations={
              <BulkOperations
                bulkDelete={selectedItems.length > 0}
                model="item"
                onModalOpen={onModalOpen}
                page={page}
                totalPages={data.totalPages}
              />
            }
          >
            {/* {checkPermissions(["create-po-request"], user.roles) && (
              <Button
                data-modal="bulk-pull-out-item-modal"
                colorScheme="success"
                onClick={(e) => {
                  router.push("/po-requests/bulk-add");
                }}
                icon={<BsBoxArrowLeft />}
                size="medium"
                label="Pull Out"
              />
            )} */}
            {checkPermissions(["create-item"], user.roles) && (
              <>
                <Button
                  onClick={() => router.push("/inventory/bulk-add")}
                  icon={<BsPlusCircle />}
                  size="medium"
                  label="Add Items"
                />
                {/* <Button
                  data-modal="new-item-modal"
                  onClick={onModalOpen}
                  icon={<BsPlusCircle />}
                  size="medium"
                  label="Add Item"
                /> */}
              </>
            )}
          </ActionTableMenu>
        </form>
      </FormProvider>
      {data ? (
        <>
          <StyledTable
            setSelectedItems={setSelectedItems}
            columns={columns}
            data={data.body}
          >
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data.totalPages}
            />
          </StyledTable>
        </>
      ) : (
        "No data available."
      )}

      <InventoryModalManager
        closeFn={onModalClose}
        selectedItems={selectedItems}
        onConfirmDelete={onConfirmDelete}
        selectedId={selectedId}
        modal={modal}
      ></InventoryModalManager>
    </>
  );
};

export default Inventory;

Inventory.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout icon={<BsBoxSeam />} title="Inventory">
      {page}
    </Layout>
  );
};
