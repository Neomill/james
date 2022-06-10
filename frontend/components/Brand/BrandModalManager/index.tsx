import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { useDeleteManyBrandMutation } from "@/redux/services/brandsAPI";
import { toast } from "react-toastify";
import BrandDetails from "../BrandDetails";
import { BrandForm } from "../BrandForm";

const BrandModalManager = ({
  closeFn = () => null,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}) => {
  const [deleteMany] = useDeleteManyBrandMutation();
  const onConfirmBulkDelete = async () => {
    toast.promise(deleteMany(selectedItems).unwrap(), {
      success: "Brands deleted successfully!",
      pending: "Deleting brands...",
      error: "Error deleting brands!",
    });
    closeFn();
  };
  return (
    <>
      <AppModal
        title="Brand Details"
        onClose={closeFn}
        isOpen={modal === "view-brand-modal"}
      >
        <BrandDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="New Brand"
        onClose={closeFn}
        isOpen={modal === "new-brand-modal"}
      >
        <BrandForm onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit Brand"
        onClose={closeFn}
        isOpen={modal === "edit-brand-modal"}
      >
        <BrandForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Brand"
        onClose={closeFn}
        isOpen={modal === "delete-brand-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>Are you sure you want to delete brand id:{selectedId} ?</p>

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
          title="Delete Brands"
          onClose={closeFn}
          isOpen={modal === "bulk-delete-brand-modal"}
        >
          <div className="flex flex-col gap-6">
            <p>Are you sure you want to delete the selected brands?</p>
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

export default BrandModalManager;
