import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { useDeleteManyPORequestMutation } from "@/redux/services/poRequestAPI";
import { toast } from "react-toastify";
import PORequestDetails from "../PORequestDetails";
import { PORequestForm } from "../PORequestForm";

interface Props {
  closeFn: () => void;
  modal: string;
  selectedId: string;
  onConfirmDelete: () => void;
  selectedItems?: any[];
}

const PORequestModalManager = ({
  closeFn = () => null,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}: Props) => {
  const [deleteMany] = useDeleteManyPORequestMutation();

  const onConfirmBulkDelete = async () => {
    toast.promise(deleteMany(selectedItems).unwrap(), {
      success: "Requests deleted successfully!",
      pending: "Deleting requests...",
      error: "Error deleting requests!",
    });
    closeFn();
  };
  return (
    <>
      <AppModal
        title="Request Details"
        onClose={closeFn}
        isOpen={modal === "view-po-request-modal"}
      >
        <PORequestDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="Edit Request"
        onClose={closeFn}
        isOpen={modal === "edit-po-request-modal"}
      >
        <PORequestForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Request"
        onClose={closeFn}
        isOpen={modal === "delete-po-request-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>Are you sure you want to delete request id:{selectedId} ?</p>
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
          title="Delete Requests"
          onClose={closeFn}
          isOpen={modal === "bulk-delete-po-request-modal"}
        >
          <div className="flex flex-col gap-6">
            <p>Are you sure you want to delete the selected items?</p>
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

export default PORequestModalManager;
