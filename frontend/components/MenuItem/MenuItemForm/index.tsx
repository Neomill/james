import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import AsyncAppSelect from "@/components/AsyncAppSelect";
import {
  addMenuItem,
  editVirtualMenuItem,
} from "@/redux/features/menuItemSlice";
import {
  useCreateMenuItemMutation,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemMutation,
} from "@/redux/services/menuItemsAPI";
import { BsArrowClockwise, BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import { useSearchMenuItemCategoryQuery } from "@/redux/services/menuItemCategoriesAPI";

const FILE_SIZE = 2000000;

const MenuItemSchema = yup
  .object({
    name: yup.string().required(),
    desc: yup.string().required(),
    qty: yup.number().moreThan(-1).integer().required(),
    cost_price: yup.number().positive().required(),
    selling_price: yup.number().positive().required(),
    menu_item_category_id: yup.object().required(),
  })
  .required();

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  onClose?: () => void;
  id?: string;
  saveArray?: any;
  setSaveArray?: any;
  removeData?: any;
  isBulkAdd?: boolean;
  virtualId?: string;
}

const defaultValues = {
  name: "",
  desc: "",
  qty: "",
  cost_price: "",
  selling_price: "",
  menu_item_category_id: null,
};

export const MenuItemForm: React.FC<Props> = ({
  onClose,
  id,
  isBulkAdd = false,
  virtualId,
  children,
  ...props
}) => {
  const methods = useForm({
    resolver: yupResolver(MenuItemSchema),
  });
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const dispatch = useAppDispatch();
  const { data: virtualMenuItems } = useAppSelector((state) => state.menuItems);
  const {
    setValue,
    reset,
    control,
    formState: { errors },
  } = methods;
  const [createMenuItem] = useCreateMenuItemMutation();

  const [menuItemCategoryPage, setMenuItemCategoryPage] = useState(0);
  const [menuItemCategoryQuery, setMenuItemCategoryQuery] = useState("");

  const { data: menuItemCategoriesAPI } = useSearchMenuItemCategoryQuery({
    page: menuItemCategoryPage,
    query: menuItemCategoryQuery,
  });

  async function loadCategoryOptions(search, loadedOptions, { page }) {
    setMenuItemCategoryPage(page);
    setMenuItemCategoryQuery(search);
    return {
      options: menuItemCategoriesAPI?.body.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      hasMore: menuItemCategoriesAPI.hasMore,
      additional: {
        page: page + 1,
      },
    };
  }
  if (id) {
    const { data: item, isLoading: isUpdating } = useGetMenuItemByIdQuery(id, {
      // pollingInterval: 3000,
      refetchOnMountOrArgChange: true,
      skip: false,
    });
    useEffect(() => {
      if (item) {
        setValue("name", item.name);
        setValue("qty", item.qty);
        setValue("desc", item.desc);
        setValue("cost_price", item.cost_price);
        setValue("selling_price", item.selling_price);
        setValue("menu_item_category_id", {
          label: item.menu_item_category?.name,
          value: item.menu_item_category_id,
        });
      }
      return () => {};
    }, [id, item]);
  } else if (virtualId) {
    const virtualItem = virtualMenuItems.find(
      (item) => Number(item.id) === Number(virtualId)
    );
    useEffect(() => {
      if (virtualItem) {
        console.log(virtualItem);
        setValue("name", virtualItem.name);
        setValue("qty", virtualItem.qty);
        setValue("desc", virtualItem.desc);
        setValue("cost_price", virtualItem.cost_price);
        setValue("selling_price", virtualItem.selling_price);
        setValue("menu_item_category_id", {
          label: virtualItem.menu_item_category_id.label,
          value: virtualItem.menu_item_category_id.value,
        });
      }
    }, [virtualItem]);
  }
  const onSubmit = async (data: any) => {
    if (!virtualId && !isBulkAdd) {
      data.menu_item_category_id = data.menu_item_category_id.value;
    }
    try {
      if (id) {
        if (typeof data.image === "string") {
          const formData = new FormData();
          formData.append("image", data.image[0]);
          for (var key in data) {
            formData.append(key, data[key]);
          }
          delete data.image;
          toast.promise(updateMenuItem({ id, ...data }), {
            pending: "Updating Menu...",
            success: "Menu updated successfully!",
            error: "Error updating menu!",
          });
        } else {
          console.log("dids");
          toast.promise(updateMenuItem({ id, ...data }), {
            pending: "Updating Menu...",
            success: "Menu updated successfully!",
            error: "Error updating menu!",
          });
        }
      } else if (virtualId) {
        dispatch(editVirtualMenuItem({ id: Number(virtualId), data }));
      } else if (isBulkAdd) {
        dispatch(addMenuItem(data));
      } else {
        toast.promise(createMenuItem(data), {
          pending: "Adding Menu...",
          success: "Menu added successfully!",
          error: "Error adding menu!",
        });
      }
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div {...props}>
      <div className="grow ">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={"flex flex-col"}>
              {/* {id && (
                <img
                  className="rounded-lg w-full h-40 object-cover"
                  src={
                    methods.getValues("image")
                      ? methods.getValues("image")
                      : "/shydan.jpg"
                  }
                  alt="No Image Available"
                />
              )} */}
              <AsyncAppSelect
                width={`${!isBulkAdd && "w-96"}`}
                name="menu_item_category_id"
                label="Category"
                placeholder="Select Category"
                loadOptions={loadCategoryOptions}
              />
              <Input
                name="name"
                label="Product Name"
                placeholder="Product Name"
              />
              <Input
                name="desc"
                label="Product Description"
                placeholder="Product Description"
              />
              <Input
                name="qty"
                min={0}
                label="Product Quantity"
                placeholder="Product Quantity"
                type="number"
              />
              <Input
                name="cost_price"
                isDecimal
                min={0}
                label="Cost Price"
                placeholder="Cost Price"
                type="number"
                step="any"
              />
              <Input
                name="selling_price"
                isDecimal
                min={0}
                label="Selling Price"
                placeholder="Selling Price"
                type="number"
                step="any"
              />
              <div className="col-span-2 flex flex-col mt-6 justify-end md:flex-row gap-3">
                {isBulkAdd && (
                  <Button
                    type="button"
                    width="wide"
                    size="medium"
                    colorScheme="danger"
                    onClick={() => reset(defaultValues)}
                    outline={isBulkAdd}
                    icon={isBulkAdd && <BsArrowClockwise />}
                    label={"Reset Fields"}
                  />
                )}
                <Button
                  type="submit"
                  width="wide"
                  size="medium"
                  outline={isBulkAdd}
                  icon={isBulkAdd && <BsPlus />}
                  label={isBulkAdd ? "Add to List" : id ? "Update" : "Submit"}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>

      {children}
    </div>
  );
};
