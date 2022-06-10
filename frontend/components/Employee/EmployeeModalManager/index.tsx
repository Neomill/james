import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { useDeleteManyEmployeeMutation } from "@/redux/services/employeesAPI";
import { toast } from "react-toastify";
import EmployeeDetails from "../EmployeeDetails";
import { EmployeeForm } from "../EmployeeForm";

const EmployeeModalManager = ({
  closeFn = () => null,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}) => {
  const [deleteMany] = useDeleteManyEmployeeMutation();
  const onConfirmBulkDelete = async () => {
    toast.promise(deleteMany(selectedItems).unwrap(), {
      success: "Employees deleted successfully!",
      pending: "Deleting employees...",
      error: "Error deleting employees!",
    });
    closeFn();
  };
  return (
    <>
      <AppModal
        title="Employee Details"
        onClose={closeFn}
        isOpen={modal === "view-employee-modal"}
      >
        <EmployeeDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="New Employee"
        onClose={closeFn}
        isOpen={modal === "new-employee-modal"}
      >
        <EmployeeForm onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit Employee"
        onClose={closeFn}
        isOpen={modal === "edit-employee-modal"}
      >
        <EmployeeForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Employee"
        onClose={closeFn}
        isOpen={modal === "delete-employee-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>Are you sure you want to delete employee id:{selectedId} ?</p>

          <div className="gap-3 flex flex-col md:flex-row md:justify-end">
            <Button
              size="medium"
              colorScheme="secondary"
              label="Cancel"
              onClick={closeFn}
            />
            <Button
              onClick={onConfirmDelete}
              size="medium"
              colorScheme="danger"
              label="Confirm"
            />
          </div>
        </div>
      </AppModal>

      {selectedItems?.length > 0 && (
        <AppModal
          title="Delete Employees"
          onClose={closeFn}
          isOpen={modal === "bulk-delete-employee-modal"}
        >
          <div className="flex flex-col gap-6">
            <p>Are you sure you want to delete the selected employees?</p>
            <div className="gap-3 flex flex-col md:flex-row md:justify-end">
              <Button
                onClick={closeFn}
                size="medium"
                colorScheme="secondary"
                label="Cancel"
              />
              <Button
                onClick={onConfirmBulkDelete}
                size="medium"
                colorScheme="danger"
                label="Confirm"
              />
            </div>
          </div>
        </AppModal>
      )}
    </>
  );
};

export default EmployeeModalManager;
