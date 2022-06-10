import React from "react";
import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import ItemDetails from "../MenuItemDetails";
import { PORequestForm } from "@/components/PORequest/PORequestForm";
import { useDeleteManyItemMutation } from "@/redux/services/itemsAPI";
import { toast } from "react-toastify";
import { RestockingForm } from "../MenuRestockingForm";
import { useDeleteManyMenuItemMutation } from "@/redux/services/menuItemsAPI";
import MenuItemDetails from "../MenuItemDetails";
import { MenuItemForm } from "../MenuItemForm";

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
  const [deleteMany] = useDeleteManyMenuItemMutation();
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
        title="Menu Item Details"
        onClose={closeFn}
        isOpen={modal === "view-menu-item-modal"}
      >
        <MenuItemDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="New Menu"
        onClose={closeFn}
        isOpen={modal === "new-menu-item-modal"}
      >
        <MenuItemForm onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit Menu"
        onClose={closeFn}
        isOpen={modal === "edit-menu-item-modal"}
      >
        <MenuItemForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Restock Item"
        onClose={closeFn}
        isOpen={modal === "restock-menu-item-modal"}
      >
        <RestockingForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Item"
        onClose={closeFn}
        isOpen={modal === "delete-menu-item-modal"}
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
          isOpen={modal === "bulk-delete-menu-item-modal"}
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

export default InventoryModalManager;
