import React from "react";
import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { PORequestForm } from "@/components/PORequest/PORequestForm";
import { useDeleteManyItemMutation } from "@/redux/services/itemsAPI";
import { toast } from "react-toastify";
import { RestockingForm } from "../EquipmentRestockingForm";
import { useDeleteManyEquipmentItemMutation } from "@/redux/services/equipmentItemsAPI";
import EquipmentItemDetails from "../EquipmentItemDetails";
import { EquipmentItemForm } from "../EquipmentItemForm";

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
  const [deleteMany] = useDeleteManyEquipmentItemMutation();
  const onConfirmBulkDelete = async () => {
    toast.promise(deleteMany(selectedItems).unwrap(), {
      success: "Equipment deleted successfully!",
      pending: "Deleting Equipments...",
      error: "Error deleting Equipment!",
    });
    closeFn();
  };
  return (
    <>
      <AppModal
        title="Equipment Item Details"
        onClose={closeFn}
        isOpen={modal === "view-equipment-item-modal"}
      >
        <EquipmentItemDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="New Equipment"
        onClose={closeFn}
        isOpen={modal === "new-equipment-item-modal"}
      >
        <EquipmentItemForm onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit Equipment"
        onClose={closeFn}
        isOpen={modal === "edit-equipment-item-modal"}
      >
        <EquipmentItemForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Restock Equipment"
        onClose={closeFn}
        isOpen={modal === "restock-equipment-item-modal"}
      >
        <RestockingForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Item"
        onClose={closeFn}
        isOpen={modal === "delete-equipment-item-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>Are you sure you want to Equipment item id:{selectedId} ?</p>

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
          title="Delete Equipment Items"
          onClose={closeFn}
          isOpen={modal === "bulk-delete-menu-item-modal"}
        >
          <div className="flex flex-col gap-6">
            <p>Are you sure you want to delete the selected Equipment?</p>
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
