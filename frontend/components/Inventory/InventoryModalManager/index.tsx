import React from "react";
import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { InventoryForm } from "../InventoryForm";
import ItemDetails from "../ItemDetails";
import { PORequestForm } from "@/components/PORequest/PORequestForm";
import { useDeleteManyItemMutation } from "@/redux/services/itemsAPI";
import { toast } from "react-toastify";
import { RestockingForm } from "../RestockingForm";

interface Props {
  closeFn: () => void;
  modal: string;
  selectedId: string;
  onConfirmDelete: () => void;
  selectedItems: any[];
}

const InventoryModalManager: React.FC<Props> = ({
  closeFn = () => null,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}) => {
  const [deleteMany] = useDeleteManyItemMutation();
  const onConfirmBulkDelete = async () => {
    toast.promise(deleteMany(selectedItems).unwrap(), {
      success: "Items deleted successfully!",
      pending: "Deleting items...",
      error: "Error deleting items!",
    });
    closeFn();
  };
  return (
    <>
      <AppModal
        title="Item Details"
        onClose={closeFn}
        isOpen={modal === "view-item-modal"}
      >
        <ItemDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="New Item"
        onClose={closeFn}
        isOpen={modal === "new-item-modal"}
      >
        <InventoryForm onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit Item"
        onClose={closeFn}
        isOpen={modal === "edit-item-modal"}
      >
        <InventoryForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Restock Item"
        onClose={closeFn}
        isOpen={modal === "restock-item-modal"}
      >
        <RestockingForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Item"
        onClose={closeFn}
        isOpen={modal === "delete-item-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>Are you sure you want to delete item id:{selectedId} ?</p>

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
          title="Delete Items"
          onClose={closeFn}
          isOpen={modal === "bulk-delete-item-modal"}
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

      {/* PULL OUT REQUEST */}

      <AppModal
        isOpen={modal === "single-pull-out-item-modal"}
        title="New Pull-out Request"
        onClose={closeFn}
      >
        <PORequestForm height="35rem" item_id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="New Pull-out Request"
        onClose={closeFn}
        isOpen={modal === "bulk-pull-out-item-modal"}
      >
        <PORequestForm items={selectedItems} onClose={closeFn} />
      </AppModal>
    </>
  );
};

export default InventoryModalManager;
