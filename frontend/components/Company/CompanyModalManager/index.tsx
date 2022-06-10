import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { useDeleteManyCompanyMutation } from "@/redux/services/companiesAPI";
import { toast } from "react-toastify";
import CompanyDetails from "../CompanyDetails";
import { CompanyForm } from "../CompanyForm";

const CompanyModalManager = ({
  closeFn = () => null,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}) => {
  const [deleteMany] = useDeleteManyCompanyMutation();
  const onConfirmBulkDelete = async () => {
    toast.promise(deleteMany(selectedItems).unwrap(), {
      success: "Companies deleted successfully!",
      pending: "Deleting companies...",
      error: "Error deleting companies!",
    });
    closeFn();
  };

  return (
    <>
      <AppModal
        title="Company Details"
        onClose={closeFn}
        isOpen={modal === "view-company-modal"}
      >
        <CompanyDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="New Company"
        onClose={closeFn}
        isOpen={modal === "new-company-modal"}
      >
        <CompanyForm onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit Company"
        onClose={closeFn}
        isOpen={modal === "edit-company-modal"}
      >
        <CompanyForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Company"
        onClose={closeFn}
        isOpen={modal === "delete-company-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>Are you sure you want to delete company id:{selectedId} ?</p>

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
          title="Delete Suppliers"
          onClose={closeFn}
          isOpen={modal === "bulk-delete-company-modal"}
        >
          <div className="flex flex-col gap-6">
            <p>Are you sure you want to delete the selected suppliers?</p>
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

export default CompanyModalManager;
