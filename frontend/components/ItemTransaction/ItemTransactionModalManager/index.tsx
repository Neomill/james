import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { useDeleteManyItemTransactionMutation } from "@/redux/services/itemTransactionAPI";
import { toast } from "react-toastify";
import ItemTransactionDetails from "../ItemTransactionDetails";
import { ItemTransactionForm } from "../ItemTransactionForm";

const ItemTransactionModalManager = ({
  closeFn = () => null,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}) => {
  const [deleteMany] = useDeleteManyItemTransactionMutation();
  const onConfirmBulkDelete = async () => {
    toast.promise(deleteMany(selectedItems).unwrap(), {
      success: "Transactions deleted successfully!",
      pending: "Deleting transactions...",
      error: "Error deleting transactions!",
    });
    closeFn();
  };
  return (
    <>
      <AppModal
        title="Item Transaction Details"
        onClose={closeFn}
        isOpen={modal === "view-item-transaction-modal"}
      >
        <ItemTransactionDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="New Item Transaction"
        onClose={closeFn}
        isOpen={modal === "new-item-transaction-modal"}
      >
        <ItemTransactionForm onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit Item Transaction"
        onClose={closeFn}
        isOpen={modal === "edit-item-transaction-modal"}
      >
        <ItemTransactionForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Item Transaction"
        onClose={closeFn}
        isOpen={modal === "delete-item-transaction-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>
            Are you sure you want to delete item-transaction id:{selectedId} ?
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
          title="Delete Item Transaction"
          onClose={closeFn}
          isOpen={modal === "bulk-delete-item-transaction-modal"}
        >
          <div className="flex flex-col gap-6">
            <p>Are you sure you want to delete the selected transactions?</p>
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

export default ItemTransactionModalManager;
