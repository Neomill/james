import ActionButton from "@/components/ActionButton";
import ActionTableMenu from "@/components/ActionTableMenu";
import BulkOperations from "@/components/BulkOperations";
import { Button } from "@/components/Button";
import EmployeeModalManager from "@/components/Employee/EmployeeModalManager";
import Forbidden from "@/components/Forbidden";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import StyledTable from "@/components/StyledTable";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";
import {
  useDeleteEmployeeMutation,
  useSearchEmployeesQuery,
} from "@/redux/services/employeesAPI";
import { useSearchPositionsQuery } from "@/redux/services/positionsAPI";
import checkPermissions from "@/utils/checkPermissions";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsPeople, BsPlusCircle } from "react-icons/bs";
import { toast } from "react-toastify";
const Employees = ({}) => {
  const [page, setPage] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modal, setModal] = useState<string>("");
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [selectedId, setSelectedId] = useState("");
  const { user } = useAuth();
  const { filters, sortBy } = useAppSelector((state) => state.filters);

  // const [positionPage, setPositionPage] = useState(0);
  // const [positionQuery, setPositionQuery] = useState("");

  // const { data: positions } = useSearchPositionsQuery({
  //   page: positionPage,
  //   query: positionQuery,
  // });

  //---SEARCH FUNCTIONS
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchEmployeesQuery({
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
    toast.promise(deleteEmployee(selectedId).unwrap(), {
      success: "Employee deleted successfully!",
      error: "Error deleting employee!",
      pending: "Deleting employee...",
    });
    setSelectedId("");
    onModalClose();
  };

  // TODO POSITION
  // const filterOptions = useMemo(
  //   () => [
  //     {
  //       title: "Position",
  //       selector: "position",
  //       sub_options: [
  //         {
  //           title: "All",
  //           value: "",
  //         },
  //         ...positions.body.map((position) => {
  //           return { title: position.name, value: position.id };
  //         }),
  //       ],
  //     },
  //   ],
  //   [positions]
  // );

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
            title: "First Name: A-Z",
            value: { selector: "fname", value: 0 },
          },
          {
            title: "First Name: Z-A",
            value: { selector: "fname", value: 1 },
          },
          {
            title: "Last Name: A-Z",
            value: { selector: "lname", value: 0 },
          },
          {
            title: "Last Name: Z-A",
            value: { selector: "lname", value: 1 },
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
        Header: "First Name",
        accessor: "fname",
      },
      {
        Header: "Last name",
        accessor: "lname",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Position",
        accessor: "position.name",
      },
      {
        Header: "Branch",
        accessor: "branch.name",
      },
      {
        Header: "Actions",
        Cell: (props: any) => (
          <div className="flex flex-row gap-3">
            <ActionButton
              data-modal="view-employee-modal"
              onClick={(e) => onModalOpen(e, props.row.original.id)}
              action="view"
            />
            {checkPermissions(["update-employee"], user.roles) && (
              <ActionButton
                data-modal="edit-employee-modal"
                onClick={(e) => onModalOpen(e, props.row.original.id)}
                action="edit"
              />
            )}

            {checkPermissions(["delete-employee"], user.roles) && (
              <ActionButton
                data-modal="delete-employee-modal"
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
  if (!checkPermissions(["read-employee"], user.roles)) {
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
                model="employee"
                onModalOpen={onModalOpen}
                page={page}
                totalPages={data.totalPages}
              />
            }
            // filterOptions={filterOptions}
            sortOptions={sortOptions}
            title="List of Employees"
            onSubmit={onSubmitSearch}
          >
            {checkPermissions(["create-employee"], user.roles) && (
              <>
                <Button
                  data-modal="new-employee-modal"
                  onClick={onModalOpen}
                  icon={<BsPlusCircle />}
                  size="medium"
                  label="Add Employee"
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
          {console.log(data.body)}
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data.totalPages}
          />
        </StyledTable>
      ) : (
        "No data available."
      )}
      <EmployeeModalManager
        selectedId={selectedId}
        selectedItems={selectedItems}
        modal={modal}
        onConfirmDelete={onConfirmDelete}
        closeFn={onModalClose}
      />
    </>
  );
};

export default Employees;

Employees.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout icon={<BsPeople />} title="Employees">
      {page}
    </Layout>
  );
};
