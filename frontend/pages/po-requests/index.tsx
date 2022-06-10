import ActionButton from "@/components/ActionButton";
import ActionTableMenu from "@/components/ActionTableMenu";
import BulkOperations from "@/components/BulkOperations";
import { Button } from "@/components/Button";
import Forbidden from "@/components/Forbidden";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import PORequestModalManager from "@/components/PORequest/PORequestModalManager";
import StyledTable from "@/components/StyledTable";
import Tag from "@/components/Tag";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";
import {
  useDeletePORequestMutation,
  useSearchPORequestQuery,
} from "@/redux/services/poRequestAPI";
import checkPermissions from "@/utils/checkPermissions";
import {
  poRequestReasonColorPicker,
  poRequestReasonText,
  poRequestStatusColorPicker,
  poRequestStatusText,
} from "@/utils/poRequestHelper";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsBoxArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";

const PORequests = () => {
  const [page, setPage] = useState(0);
  const { user } = useAuth();
  const { filters, sortBy } = useAppSelector((state) => state.filters);

  //---SEARCH FUNCTIONS
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchPORequestQuery({
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
  const router = useRouter();

  const [deletePORequest] = useDeletePORequestMutation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [modal, setModal] = useState<string>("");
  const [selectedId, setSelectedId] = useState("");

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
    toast.promise(deletePORequest(selectedId).unwrap(), {
      success: "Request deleted successfully!",
      error: "Error deleting request!",
      pending: "Deleting request...",
    });
    setSelectedId("");
    onModalClose();
  };

  const filterOptions = useMemo(
    () => [
      {
        title: "Reason",
        selector: "reason",
        sub_options: [
          {
            title: "All",
            value: "",
          },
          {
            title: "Overstocking",
            value: "OVERSTOCKING",
          },
          {
            title: "Bad order",
            value: "BAD_ORDER",
          },
          {
            title: "Expired",
            value: "EXPIRED",
          },
          {
            title: "Others",
            value: "OTHERS",
          },
        ],
      },
      {
        title: "Status",
        selector: "status",
        sub_options: [
          {
            title: "All",
            value: "",
          },
          {
            title: "Pending",
            value: "PENDING",
          },
          {
            title: "Returned",
            value: "RETURNED",
          },
        ],
      },
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
            title: "Request No: A-Z",
            value: { selector: "request_no", value: 0 },
          },
          {
            title: "Request No: Z-A",
            value: { selector: "request_no", value: 1 },
          },
          {
            title: "Item Name: A-Z",
            value: { selector: "item_name", value: 0 },
          },
          {
            title: "Item Name: Z-A",
            value: { selector: "item_name", value: 1 },
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
        Header: "Request No",
        accessor: "request_no",
      },
      {
        Header: "Item Name",
        accessor: "item_transaction.item.name",
      },
      {
        Header: "Storage",
        Cell: (props: any) => (
          <div>{props.row.original.storage_location.name}</div>
        ),
      },
      {
        Header: "Date created",
        accessor: "createdAt",
        Cell: (props: any) => (
          <div>{dayjs(props.value).format("MM-DD-YYYY")}</div>
        ),
      },

      {
        Header: "Reason",
        accessor: "reason",
        Cell: (props: any) => (
          <Tag tailwindColor={poRequestReasonColorPicker(props.value)}>
            {poRequestReasonText(props.value)}
          </Tag>
        ),
      },
      // {
      //   Header: "Status",
      //   accessor: "status",
      //   Cell: (props: any) => (
      //     <Tag tailwindColor={poRequestStatusColorPicker(props.value)}>
      //       {poRequestStatusText(props.value)}
      //     </Tag>
      //   ),
      // },

      {
        Header: "Actions",
        Cell: (props: any) => (
          <div className="flex flex-row gap-4 items-center  justify-center">
            <ActionButton
              data-modal="view-po-request-modal"
              onClick={(e) => onModalOpen(e, props.row.original.id)}
              action="view"
            />
            {checkPermissions(["update-po-request"], user.roles) && (
              <ActionButton
                data-modal="edit-po-request-modal"
                onClick={(e) => onModalOpen(e, props.row.original.id)}
                action="edit"
              />
            )}

            {/* {checkPermissions(["delete-po-request"], user.roles) && (
              <ActionButton
                data-modal="delete-po-request-modal"
                onClick={(e) => onModalOpen(e, props.row.original.id)}
                action="delete"
              />
            )} */}
          </div>
        ),
      },
    ],
    []
  );

  if (!checkPermissions(["read-po-request"], user.roles)) {
    return <Forbidden />;
  }

  if (error) return <p>Ooops. Something went wrong!</p>;

  if (isLoading) return <Loading />;

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitSearch)}>
          <ActionTableMenu
            // operations={
            //   <BulkOperations
            //     bulkDelete={selectedItems.length > 0}
            //     model="po-request"
            //     onModalOpen={onModalOpen}
            //     page={page}
            //     totalPages={data.totalPages}
            //   />
            // }
            filterOptions={filterOptions}
            sortOptions={sortOptions}
            title="List of Pull-out Requests"
            onSubmit={onSubmitSearch}
          >
            {/* {checkPermissions(["create-po-request"], user.roles) && (
              <Button
                data-modal="bulk-pull-out-item-modal"
                onClick={(e) => {
                  router.push("/po-requests/bulk-add");
                }}
                icon={<BsBoxArrowLeft />}
                size="medium"
                label="Pull out items"
              />
            )} */}
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

      <PORequestModalManager
        closeFn={onModalClose}
        selectedId={selectedId}
        selectedItems={selectedItems}
        onConfirmDelete={onConfirmDelete}
        modal={modal}
      />
    </>
  );
};

export default PORequests;

PORequests.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout icon={<BsBoxArrowLeft />} title="Pull-out Requests">
      {page}
    </Layout>
  );
};
