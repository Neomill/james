import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { useDeleteManyStorageLocationMutation } from "@/redux/services/storageLocationAPI";
import { toast } from "react-toastify";
import StorageLocationDetails from "../StorageLocationDetails";
import { StorageLocationForm } from "../StorageLocationForm";

const StorageLocationModalManager = ({
  closeFn = () => null,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}) => {
  const [deleteMany] = useDeleteManyStorageLocationMutation();
  const onConfirmBulkDelete = async () => {
    toast.promise(deleteMany(selectedItems).unwrap(), {
      success: "Storage Locations deleted successfully!",
      pending: "Deleting storage locations...",
      error: "Error deleting storage locations!",
    });
    closeFn();
  };
  return (
    <>
      <AppModal
        title="Storage Location Details"
        onClose={closeFn}
        isOpen={modal === "view-storage-location-modal"}
      >
        <StorageLocationDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="New Storage Location"
        onClose={closeFn}
        isOpen={modal === "new-storage-location-modal"}
      >
        <StorageLocationForm onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit Storage Location"
        onClose={closeFn}
        isOpen={modal === "edit-storage-location-modal"}
      >
        <StorageLocationForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Storage Location"
        onClose={closeFn}
        isOpen={modal === "delete-storage-location-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>
            Are you sure you want to delete storage location id:{selectedId} ?
          </p>

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
          title="Delete Storage Locations"
          onClose={closeFn}
          isOpen={modal === "bulk-delete-storage-location-modal"}
        >
          <div className="flex flex-col gap-6">
            <p>
              Are you sure you want to delete the selected storage locations?
            </p>
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

export default StorageLocationModalManager;
