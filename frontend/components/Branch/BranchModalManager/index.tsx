import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { useDeleteManyBranchMutation } from "@/redux/services/branchAPI";
import { toast } from "react-toastify";
import BranchDetails from "../BranchDetails";
import { BranchForm } from "../BranchForm";

const BranchModalManager = ({
  closeFn = () => null,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}) => {
  const [deleteMany] = useDeleteManyBranchMutation();
  const onConfirmBulkDelete = async () => {
    toast.promise(deleteMany(selectedItems).unwrap(), {
      success: "Categories deleted successfully!",
      pending: "Deleting categories...",
      error: "Error deleting categories!",
    });
    closeFn();
  };
  return (
    <>
      <AppModal
        title="Branch Details"
        onClose={closeFn}
        isOpen={modal === "view-branch-modal"}
      >
        <BranchDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="New Branch"
        onClose={closeFn}
        isOpen={modal === "new-branch-modal"}
      >
        <BranchForm onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit Branch"
        onClose={closeFn}
        isOpen={modal === "edit-branch-modal"}
      >
        <BranchForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Branch"
        onClose={closeFn}
        isOpen={modal === "delete-branch-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>Are you sure you want to delete branch id:{selectedId} ?</p>

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
          title="Delete Branch"
          onClose={closeFn}
          isOpen={modal === "bulk-branch-modal"}
        >
          <div className="flex flex-col gap-6">
            <p>Are you sure you want to delete the selected branches?</p>
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

export default BranchModalManager;
