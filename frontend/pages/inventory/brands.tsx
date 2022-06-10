import ActionButton from "@/components/ActionButton";
import { Button } from "@/components/Button";
import BrandModalManager from "@/components/Brand/BrandModalManager";
import StyledTable from "@/components/StyledTable";

import dayjs from "dayjs";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { BsPlusCircle, BsTag } from "react-icons/bs";
import Pagination from "@/components/Pagination";
import {
  useDeleteBrandMutation,
  useGetAllBrandQuery,
  useSearchBrandsQuery,
} from "@/redux/services/brandsAPI";
import { FormProvider, useForm } from "react-hook-form";
import ActionTableMenu from "@/components/ActionTableMenu";
import { toast } from "react-toastify";
import checkPermissions from "@/utils/checkPermissions";
import { useAuth } from "@/hooks/useAuth";
import Forbidden from "@/components/Forbidden";
import { useAppSelector } from "@/redux/hooks";
import Loading from "@/components/Loading";
import Layout from "@/components/Layout";
import BulkOperations from "@/components/BulkOperations";

const Brands = () => {
  const [page, setPage] = useState(0);
  const [deleteBrand] = useDeleteBrandMutation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [modal, setModal] = useState<string>("");
  const { user } = useAuth();
  const { filters, sortBy } = useAppSelector((state) => state.filters);

  //---SEARCH FUNCTIONS
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchBrandsQuery({
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
    toast.promise(deleteBrand(selectedId).unwrap(), {
      success: "Brand deleted successfully!",
      error: "Error deleting brand!",
      pending: "Deleting brand...",
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
              data-modal="view-brand-modal"
              onClick={(e) => onModalOpen(e, props.row.original.id)}
              action="view"
            />
            {checkPermissions(["update-brand"], user.roles) && (
              <ActionButton
                data-modal="edit-brand-modal"
                onClick={(e) => onModalOpen(e, props.row.original.id)}
                action="edit"
              />
            )}

            {checkPermissions(["delete-brand"], user.roles) && (
              <ActionButton
                data-modal="delete-brand-modal"
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
  if (!checkPermissions(["read-brand"], user.roles)) {
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
                model="brand"
                onModalOpen={onModalOpen}
                page={page}
                totalPages={data.totalPages}
              />
            }
            title="List of Brands"
            onSubmit={onSubmitSearch}
          >
            {checkPermissions(["create-brand"], user.roles) && (
              <>
                <Button
                  data-modal="new-brand-modal"
                  onClick={onModalOpen}
                  icon={<BsPlusCircle />}
                  size="medium"
                  label="Add Brand"
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
      <BrandModalManager
        closeFn={onModalClose}
        selectedItems={selectedItems}
        onConfirmDelete={onConfirmDelete}
        selectedId={selectedId}
        modal={modal}
      />
    </>
  );
};

export default Brands;

Brands.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout icon={<BsTag />} title="Brands">
      {page}
    </Layout>
  );
};
