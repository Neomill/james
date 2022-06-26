import AppModal from "@/components/AppModal";
import TransactionDetails from "../TransactionDetails";

const TransactionModalManager = ({
  closeFn = () => null,
  isPO,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}) => {
  return (
    <>
      <AppModal
        title="Transaction Details"
        onClose={closeFn}
        isOpen={modal === "view-transaction-modal"}
      >
        <TransactionDetails isPO={isPO} id={selectedId} onClose={closeFn} />
      </AppModal>
    </>
  );
};

export default TransactionModalManager;
