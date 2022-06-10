import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { useDeleteManyPositionMutation } from "@/redux/services/positionsAPI";
import { toast } from "react-toastify";
import PositionDetails from "../PositionDetails";
import { PositionForm } from "../PositionForm";

const PositionModalManager = ({
  closeFn = () => null,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}) => {
  const [deleteMany] = useDeleteManyPositionMutation();
  const onConfirmBulkDelete = async () => {
    toast.promise(deleteMany(selectedItems).unwrap(), {
      success: "Positions deleted successfully!",
      pending: "Deleting positions...",
      error: "Error deleting positions!",
    });
    closeFn();
  };
  return (
    <>
      <AppModal
        title="Position Details"
        onClose={closeFn}
        isOpen={modal === "view-position-modal"}
      >
        <PositionDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="New Position"
        onClose={closeFn}
        isOpen={modal === "new-position-modal"}
      >
        <PositionForm onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit Position"
        onClose={closeFn}
        isOpen={modal === "edit-position-modal"}
      >
        <PositionForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Position"
        onClose={closeFn}
        isOpen={modal === "delete-position-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>Are you sure you want to delete position id:{selectedId} ?</p>

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
          title="Delete Positions"
          onClose={closeFn}
          isOpen={modal === "bulk-delete-position-modal"}
        >
          <div className="flex flex-col gap-6">
            <p>Are you sure you want to delete the selected positions?</p>
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

export default PositionModalManager;
