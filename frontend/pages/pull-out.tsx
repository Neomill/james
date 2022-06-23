import ActionButton from "@/components/ActionButton";
import ActionTableMenu from "@/components/ActionTableMenu";
import BulkOperations from "@/components/BulkOperations";
import { Button } from "@/components/Button";
import Forbidden from "@/components/Forbidden";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import PullOutModalManager from "@/components/PullOut/PullOutModalManager";
import Pagination from "@/components/Pagination";
import StyledTable from "@/components/StyledTable";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";
import {
    useDeletePullOutMutation,
    useSearchPullOutQuery,
} from "@/redux/services/pullOutAPI";
import checkPermissions from "@/utils/checkPermissions";
import dayjs from "dayjs";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsListUl, BsPlusCircle } from "react-icons/bs";
import { toast } from "react-toastify";

const PullOut = () => {
  const [page, setPage] = useState(0);
  const [deletePullOut] = useDeletePullOutMutation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [modal, setModal] = useState<string>("");
  const { user } = useAuth();
  const { filters, sortBy } = useAppSelector((state) => state.filters);

  //---SEARCH FUNCTIONS
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchPullOutQuery({
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
    toast.promise(deletePullOut(selectedId).unwrap(), {
      success: "PullOut deleted successfully!",
      error: "Error deleting PullOut!",
      pending: "Deleting PullOut...",
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
        Header: "Product Name",
        accessor: "menu_item.name",
      },
      {
        Header: "Description/Reason",
        accessor: "reason",
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
              data-modal="view-pull-out-modal"
              onClick={(e) => onModalOpen(e, props.row.original.id)}
              action="view"
            />
            {checkPermissions(["update-pull-out"], user.roles) && (
              <ActionButton
                data-modal="edit-pull-out-modal"
                onClick={(e) => onModalOpen(e, props.row.original.id)}
                action="edit"
              />
            )}
            {checkPermissions(["delete-pull-out"], user.roles) && (
              <ActionButton
                data-modal="delete-pull-out-modal"
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
  if (!checkPermissions(["read-pull-out"], user.roles)) {
    return <Forbidden />;
  }
  if (error){
    console.log(error) 
    return <p>Ooops. Something went wrong!</p>;
  }
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
                model="pull-out"
                onModalOpen={onModalOpen}
                page={page}
                totalPages={data.totalPages}
              />
            }
            title="List of Pull Out"
            onSubmit={onSubmitSearch}
          >
            {checkPermissions(["create-pull-out"], user.roles) && (
              <>
                <Button
                  data-modal="new-pull-out-modal"
                  onClick={onModalOpen}
                  icon={<BsPlusCircle />}
                  size="medium"
                  label="Add Pull Out"
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
      <PullOutModalManager
        closeFn={onModalClose}
        selectedItems={selectedItems}
        onConfirmDelete={onConfirmDelete}
        selectedId={selectedId}
        modal={modal}
      />
    </>
  );
};

export default PullOut;
PullOut.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout icon={<BsListUl />} title="Pull Out">
      {page}
    </Layout>
  );
};
