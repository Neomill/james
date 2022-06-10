import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { useDeleteManyEmployeeMutation } from "@/redux/services/employeesAPI";
import { toast } from "react-toastify";
import POSReceipt from "../../POSReceipt";
import InvoiceDetails from "../InvoiceDetails";
import { InvoiceForm } from "../InvoiceForm";

const InvoiceModalmanager = ({
  closeFn = () => null,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}) => {
  // const [deleteMany] = useDeleteManyEmployeeMutation();
  // const onConfirmBulkDelete = async () => {
  //   toast.promise(deleteMany(selectedItems).unwrap(), {
  //     success: "Invoices deleted successfully!",
  //     pending: "Deleting invoices...",
  //     error: "Error deleting invoices!",
  //   });
  //   closeFn();
  // };
  return (
    <>
      <AppModal
        title="Invoice Details"
        onClose={closeFn}
        isOpen={modal === "view-invoice-modal"}
      >
        <InvoiceDetails id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit Invoice"
        onClose={closeFn}
        isOpen={modal === "edit-invoice-modal"}
      >
        <InvoiceForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Invoice"
        onClose={closeFn}
        isOpen={modal === "delete-invoice-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>Are you sure you want to delete invoice id:{selectedId} ?</p>

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
          title="Delete Invoices"
          onClose={closeFn}
          isOpen={modal === "bulk-delete-invoice-modal"}
        >
          <div className="flex flex-col gap-6">
            <p>Are you sure you want to delete the selected invoices?</p>
            <div className="gap-3 flex flex-col md:flex-row md:justify-end">
              <Button
                onClick={closeFn}
                size="medium"
                colorScheme="secondary"
                label="Cancel"
              />
              <Button
                // onClick={onConfirmBulkDelete}
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

export default InvoiceModalmanager;
