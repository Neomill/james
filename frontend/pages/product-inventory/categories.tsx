import ActionButton from "@/components/ActionButton";
import ActionTableMenu from "@/components/ActionTableMenu";
import BulkOperations from "@/components/BulkOperations";
import { Button } from "@/components/Button";
import CategoryModalManager from "@/components/Category/CategoryModalManager";
import Forbidden from "@/components/Forbidden";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import MenuItemCategoryModalManager from "@/components/MenuItemCategory/CategoryModalManager";
import Pagination from "@/components/Pagination";
import StyledTable from "@/components/StyledTable";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";
import {
  useDeleteCategoryMutation,
  useSearchCategoryQuery,
} from "@/redux/services/categoriesAPI";
import {
  useDeleteMenuItemCategoryMutation,
  useSearchMenuItemCategoryQuery,
} from "@/redux/services/menuItemCategoriesAPI";
import checkPermissions from "@/utils/checkPermissions";
import dayjs from "dayjs";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsListUl, BsPlusCircle } from "react-icons/bs";
import { toast } from "react-toastify";

const MenuItemCategories = () => {
  const [page, setPage] = useState(0);
  const [deleteCategory] = useDeleteMenuItemCategoryMutation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [modal, setModal] = useState<string>("");
  const { user } = useAuth();
  const { filters, sortBy } = useAppSelector((state) => state.filters);

  //---SEARCH FUNCTIONS
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchMenuItemCategoryQuery({
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

  const onConfirmDelete = async () => {
    toast.promise(deleteCategory(selectedId).unwrap(), {
      success: "Category deleted successfully!",
      error: "Error deleting category!",
      pending: "Deleting category...",
    });
    setSelectedId("");
    onModalClose();
  };

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
            title: "Last Created",
            value: { selector: "createdAt", value: 1 },
          },
          {
            title: "Last Updated",
            value: { selector: "updatedAt", value: 1 },
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
        Header: "Date created",
        accessor: "createdAt",
        Cell: (props: any) => (
          <div>{dayjs(props.value).format("MM-DD-YYYY")}</div>
        ),
      },
      {
        Header: "Actions",
        Cell: (props: any) => (
          <div className=" flex flex-row gap-4 items-center">
            <ActionButton
              data-modal="view-menu-item-category-modal"
              onClick={(e) => onModalOpen(e, props.row.original.id)}
              action="view"
            />
            {checkPermissions(["update-menu-item-category"], user.roles) && (
              <ActionButton
                data-modal="edit-menu-item-category-modal"
                onClick={(e) => onModalOpen(e, props.row.original.id)}
                action="edit"
              />
            )}
            {checkPermissions(["delete-menu-item-category"], user.roles) && (
              <ActionButton
                data-modal="delete-menu-item-category-modal"
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
  if (!checkPermissions(["read-menu-item-category"], user.roles)) {
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
            operations={
              <BulkOperations
                bulkDelete={selectedItems.length > 0}
                model="menu-item-category"
                onModalOpen={onModalOpen}
                page={page}
                totalPages={data.totalPages}
              />
            }
            title="List of Menu Categories"
            onSubmit={onSubmitSearch}
          >
            {checkPermissions(["create-menu-item-category"], user.roles) && (
              <>
                <Button
                  data-modal="new-menu-item-category-modal"
                  onClick={onModalOpen}
                  icon={<BsPlusCircle />}
                  size="medium"
                  label="Add Category"
                />
              </>
            )}
          </ActionTableMenu>
        </form>
      </FormProvider>
      {data ? (
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
      ) : (
        "No data available."
      )}
      <MenuItemCategoryModalManager
        closeFn={onModalClose}
        selectedItems={selectedItems}
        onConfirmDelete={onConfirmDelete}
        selectedId={selectedId}
        modal={modal}
      />
    </>
  );
};

export default MenuItemCategories;
MenuItemCategories.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout icon={<BsListUl />} title="Product Categories">
      {page}
    </Layout>
  );
};
