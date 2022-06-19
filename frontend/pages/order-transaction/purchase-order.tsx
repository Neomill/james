import ActionButton from "@/components/ActionButton";
import StyledTable from "@/components/StyledTable";

import Pagination from "@/components/Pagination";
import dayjs from "dayjs";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { BsDownload, BsTag } from "react-icons/bs";

import ActionTableMenu from "@/components/ActionTableMenu";
import BulkOperations from "@/components/BulkOperations";
import Forbidden from "@/components/Forbidden";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import TransactionModalManager from "@/components/Transaction/TransactionModalManager";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";
import {
  useDeleteTransactionMutation,
  useSearchTransactionsQuery,
} from "@/redux/services/transactionsAPI";
import checkPermissions from "@/utils/checkPermissions";
import { numberWithCommas } from "@/utils/numberWithCommas";

import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ReceiptPDF from "@/components/ReceiptPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Transactions = () => {
  const [page, setPage] = useState(0);
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [modal, setModal] = useState<string>("");
  const { user } = useAuth();
  const { filters, sortBy } = useAppSelector((state) => state.filters);

  //---SEARCH FUNCTIONS
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchTransactionsQuery({
    page,
    query,
    branch: user.employee.branch_id,
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
    toast.promise(deleteTransaction(selectedId).unwrap(), {
      success: "Transaction deleted successfully!",
      error: "Error deleting transaction!",
      pending: "Deleting transaction...",
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
            title: "Transaction Code: A-Z",
            value: { selector: "transaction_code", value: 0 },
          },
          {
            title: "Transaction Code: Z-A",
            value: { selector: "transaction_code", value: 1 },
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
        Header: "Transaction Code",
        accessor: "transaction_code",
      },
      {
        Header: "Branch",
        accessor: "employee.branch_id",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: (props: any) => (
          <div>
            &#8369;
            {numberWithCommas(props.value)}
          </div>
        ),
      },
      {
        Header: "Cash",
        accessor: "cash",
        Cell: (props: any) => (
          <div>
            &#8369;
            {numberWithCommas(props.value)}
          </div>
        ),
      },
      {
        Header: "Change",
        accessor: "change",
        Cell: (props: any) => (
          <div>
            &#8369;
            {numberWithCommas(props.value)}
          </div>
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
          <div className=" flex flex-row gap-4 items-center">
            <ActionButton
              data-modal="view-transaction-modal"
              onClick={(e) => onModalOpen(e, props.row.original.id)}
              action="receipt"
            />
            {/* {checkPermissions(["update-transaction"], user.roles) && (
              <ActionButton
                data-modal="edit-transaction-modal"
                onClick={(e) => onModalOpen(e, props.row.original.id)}
                action="edit"
              />
            )}

            {checkPermissions(["delete-transaction"], user.roles) && (
              <ActionButton
                data-modal="delete-transaction-modal"
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
  if (!checkPermissions(["read-transaction"], user.roles)) {
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
                model="transaction"
                onModalOpen={onModalOpen}
                page={page}
                totalPages={data.totalPages}
              />
            }
            title="Purchase Order"
            onSubmit={onSubmitSearch}
          ></ActionTableMenu>
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
      <TransactionModalManager
        closeFn={onModalClose}
        selectedItems={selectedItems}
        onConfirmDelete={onConfirmDelete}
        selectedId={selectedId}
        modal={modal}
      />
    </>
  );
};

export default Transactions;

Transactions.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout icon={<BsTag />} title="Transactions">
      {page}
    </Layout>
  );
};
