import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { useDeleteManyCustomerMutation } from "@/redux/services/customersAPI";
import { toast } from "react-toastify";
import CustomerDetails from "../CustomerDetails";
import { CustomerForm } from "../CustomerForm";

const CustomerModalManager = ({
  closeFn = () => null,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}) => {
  const [deleteMany] = useDeleteManyCustomerMutation();
  const onConfirmBulkDelete = async () => {
    toast.promise(deleteMany(selectedItems).unwrap(), {
      success: "Customers deleted successfully!",
      pending: "Deleting customers...",
      error: "Error deleting customers!",
    });
    closeFn();
  };
  return (
    <>
      <AppModal
        title="Customer Details"
        onClose={closeFn}
        isOpen={modal === "view-customer-modal"}
      >
        <CustomerDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="New Customer"
        onClose={closeFn}
        isOpen={modal === "new-customer-modal"}
      >
        <CustomerForm onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit Customer"
        onClose={closeFn}
        isOpen={modal === "edit-customer-modal"}
      >
        <CustomerForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Customer"
        onClose={closeFn}
        isOpen={modal === "delete-customer-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>Are you sure you want to delete customer id:{selectedId} ?</p>

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
          title="Delete Customers"
          onClose={closeFn}
          isOpen={modal === "bulk-delete-customer-modal"}
        >
          <div className="flex flex-col gap-6">
            <p>Are you sure you want to delete the selected customers?</p>
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

export default CustomerModalManager;
