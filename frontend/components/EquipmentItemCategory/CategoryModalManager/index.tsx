import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import { useDeleteManyCategoryMutation } from "@/redux/services/categoriesAPI";
import { toast } from "react-toastify";
import MenuItemCategoryDetails from "../CategoryDetails";
import { MenuItemCategoryForm } from "../CategoryForm";

const MenuItemCategoryModalManager = ({
  closeFn = () => null,
  modal = "",
  selectedId,
  onConfirmDelete,
  selectedItems,
}) => {
  const [deleteMany] = useDeleteManyCategoryMutation();
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
        title="Category Details"
        onClose={closeFn}
        isOpen={modal === "view-menu-item-category-modal"}
      >
        <MenuItemCategoryDetails id={selectedId} onClose={closeFn} />
      </AppModal>
      <AppModal
        title="New Category"
        onClose={closeFn}
        isOpen={modal === "new-menu-item-category-modal"}
      >
        <MenuItemCategoryForm onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Edit Category"
        onClose={closeFn}
        isOpen={modal === "edit-menu-item-category-modal"}
      >
        <MenuItemCategoryForm id={selectedId} onClose={closeFn} />
      </AppModal>

      <AppModal
        title="Delete Category"
        onClose={closeFn}
        isOpen={modal === "delete-menu-item-category-modal"}
      >
        <div className="flex flex-col gap-6">
          <p>Are you sure you want to delete category id:{selectedId} ?</p>

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
          title="Delete Category"
          onClose={closeFn}
          isOpen={modal === "bulk-delete-menu-item-category-modal"}
        >
          <div className="flex flex-col gap-6">
            <p>Are you sure you want to delete the selected categories?</p>
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

export default MenuItemCategoryModalManager;
