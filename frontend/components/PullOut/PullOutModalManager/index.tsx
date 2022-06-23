import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { useDeleteManyPullOutMutation } from "@/redux/services/pullOutAPI";
import { toast } from "react-toastify";
import PullOutDetails from "../PullOutDetails";
import { PullOutForm } from "../PullOutForm";

const PullOutModalManager = ({
  closeFn = () => null,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}) => {
  const [deleteMany] = useDeleteManyPullOutMutation();
  const onConfirmBulkDelete = async () => {
    toast.promise(deleteMany(selectedItems).unwrap(), {
      success: "PullOut deleted successfully!",
      pending: "Deleting pullOut...",
      error: "Error deleting pullOut!",
    });
    closeFn();
  };
  return (
    <>
      <AppModal
        title="PullOut Details"
        onClose={closeFn}
        isOpen={modal === "view-pull-out-modal"}
      >
        <PullOutDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="New Pull Out"
        onClose={closeFn}
        isOpen={modal === "new-pull-out-modal"}
      >
        <PullOutForm onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit PullOut"
        onClose={closeFn}
        isOpen={modal === "edit-pull-out-modal"}
      >
        <PullOutForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete PullOut"
        onClose={closeFn}
        isOpen={modal === "delete-pull-out-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>Are you sure you want to delete pull out id:{selectedId} ?</p>

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
          title="Delete PullOut"
          onClose={closeFn}
          isOpen={modal === "bulk-pull-out-modal"}
        >
          <div className="flex flex-col gap-6">
            <p>Are you sure you want to delete the selected PullOut?</p>
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

export default PullOutModalManager;
