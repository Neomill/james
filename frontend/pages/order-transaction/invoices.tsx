import ActionButton from "@/components/ActionButton";
import ActionTableMenu from "@/components/ActionTableMenu";
import BulkOperations from "@/components/BulkOperations";
import Forbidden from "@/components/Forbidden";
import InvoiceModalmanager from "@/components/Invoice/InvoiceModalManager";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import StyledTable from "@/components/StyledTable";
import Tag from "@/components/Tag";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";
import { useSearchInvoiceQuery } from "@/redux/services/invoicesAPI";
import { useDeletePORequestMutation } from "@/redux/services/poRequestAPI";
import checkPermissions from "@/utils/checkPermissions";
import {
  invoicePaymentStatusColorPicker,
  invoicePaymentStatusText,
  invoiceStatusColorPicker,
  invoiceStatusText,
} from "@/utils/invoiceHelper";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsCart } from "react-icons/bs";
import { toast } from "react-toastify";

type Props = {};

const Invoices = (props: Props) => {
  const [page, setPage] = useState(0);
  const { user } = useAuth();
  const { filters, sortBy } = useAppSelector((state) => state.filters);

  //---SEARCH FUNCTIONS
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchInvoiceQuery({
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
      // {
      //   title: "Status",
      //   selector: "status",
      //   sub_options: [
      //     {
      //       title: "All",
      //       value: "",
      //     },
      //     {
      //       title: "In Progress",
      //       value: "IN_PROGRESS",
      //     },
      //     {
      //       title: "Ready",
      //       value: "READY",
      //     },
      //     {
      //       title: "Void",
      //       value: "VOID",
      //     },
      //   ],
      // },
      {
        title: "Payment",
        selector: "payment_status",
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
            title: "Paid",
            value: "PAID",
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
            title: "Table Name: A-Z",
            value: { selector: "table_name", value: 0 },
          },
          {
            title: "Table Name: Z-A",
            value: { selector: "table_name", value: 1 },
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
        Header: "Status",
        accessor: "status",
        Cell: (props: any) => (
          <Tag tailwindColor={invoiceStatusColorPicker(props.value)}>
            {invoiceStatusText(props.value)}
          </Tag>
        ),
      },
      {
        Header: "Payment",
        accessor: "payment_status",
        Cell: (props: any) => (
          <Tag tailwindColor={invoicePaymentStatusColorPicker(props.value)}>
            {invoicePaymentStatusText(props.value)}
          </Tag>
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
        Header: "Actions",
        Cell: (props: any) => (
          <div className="flex flex-row gap-4 items-center">
            <ActionButton
              data-modal="view-invoice-modal"
              onClick={(e) => onModalOpen(e, props.row.original.id)}
              action="receipt"
            />
            {checkPermissions(["update-invoice"], user.roles) && (
              <ActionButton
                data-modal="edit-invoice-modal"
                onClick={(e) => onModalOpen(e, props.row.original.id)}
                action="edit"
              />
            )}
            {/* {checkPermissions(["delete-invoice"], user.roles) && (
              <ActionButton
                data-modal="delete-invoice-modal"
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

  if (!checkPermissions(["read-order"], user.roles)) {
    return <Forbidden />;
  }

  if (error) return <p>Ooops. Something went wrong!</p>;

  if (isLoading) return <Loading />;

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitSearch)}>
          <ActionTableMenu
            operations={
              <BulkOperations
                bulkDelete={selectedItems.length > 0}
                model="invoice"
                onModalOpen={onModalOpen}
                page={page}
                totalPages={data.totalPages}
              />
            }
            filterOptions={filterOptions}
            sortOptions={sortOptions}
            title="List of Orders"
            onSubmit={onSubmitSearch}
          >
            {/* {checkPermissions(["create-order"], user.roles) && (
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
      <InvoiceModalmanager
        closeFn={onModalClose}
        selectedId={selectedId}
        selectedItems={selectedItems}
        onConfirmDelete={onConfirmDelete}
        modal={modal}
      />
    </>
  );
};

export default Invoices;
Invoices.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout icon={<BsCart />} title="Orders">
      {page}
    </Layout>
  );
};
