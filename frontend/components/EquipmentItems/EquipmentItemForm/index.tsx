import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import AsyncAppSelect from "@/components/AsyncAppSelect";
import {
  addEquipmentItem,
  editVirtualEquipmentItem,
} from "@/redux/features/equipmentItemSlice";
import {
  useCreateEquipmentItemMutation,
  useGetEquipmentItemByIdQuery,
  useUpdateEquipmentItemMutation,
} from "@/redux/services/equipmentItemsAPI";
import { BsArrowClockwise, BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import { useSearchEquipmentItemCategoryQuery } from "@/redux/services/equipmentItemCategoriesAPI";

const FILE_SIZE = 2000000;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const EquipmentItemSchema = yup
  .object({
    name: yup.string().required(),
    // desc: yup.string().required(),
    qty: yup.number().moreThan(-1).integer().required(),
    cost_price: yup.number().positive().required(),
    selling_price: yup.number().positive().required(),
    equipment_category_id: yup.object().required(),
    image: yup
      .mixed()
      .test("fileSize", "File Size is too large", (value) => {
        if (typeof value === "string") return true;
        return value[0]?.size <= FILE_SIZE;
      })
      .test("fileType", "Unsupported File Format", (value) => {
        if (typeof value === "string") return true;
        return SUPPORTED_FORMATS.includes(value[0]?.type);
      })
      .required(),
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
  /*desc: "",*/
  qty: "",
  cost_price: "",
  selling_price: "",
  equipment_category_id: null,
};

export const EquipmentItemForm: React.FC<Props> = ({
  onClose,
  id,
  isBulkAdd = false,
  virtualId,
  children,
  ...props
}) => {
  const methods = useForm({
    resolver: yupResolver(EquipmentItemSchema),
  });
  const [updateEquipmentItem] = useUpdateEquipmentItemMutation();
  const dispatch = useAppDispatch();
  const { data: virtualEquipmentItems } = useAppSelector((state) => state.equipmentItems);
  const {
    setValue,
    reset,
    control,
    formState: { errors },
  } = methods;
  const [createEquipmentItem] = useCreateEquipmentItemMutation();

  const [equipmentItemCategoryPage, setEquipmentItemCategoryPage] = useState(0);
  const [equipmentItemCategoryQuery, setEquipmentItemCategoryQuery] = useState("");

  const { data: equipmentItemCategoriesAPI } = useSearchEquipmentItemCategoryQuery({
    page: equipmentItemCategoryPage,
    query: equipmentItemCategoryQuery,
  });

  async function loadCategoryOptions(search, loadedOptions, { page }) {
    setEquipmentItemCategoryPage(page);
    setEquipmentItemCategoryQuery(search);
    return {
      options: equipmentItemCategoriesAPI?.body.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      hasMore: equipmentItemCategoriesAPI.hasMore,
      additional: {
        page: page + 1,
      },
    };
  }
  if (id) {
    const { data: item, isLoading: isUpdating } = useGetEquipmentItemByIdQuery(id, {
      // pollingInterval: 3000,
      refetchOnMountOrArgChange: true,
      skip: false,
    });
    useEffect(() => {
      if (item) {
        setValue("name", item.name);
        setValue("qty", item.qty);
        // setValue("desc", item.desc);
        setValue("cost_price", item.cost_price);
        setValue("selling_price", item.selling_price);
        setValue("image", item.image_url);
        setValue("equipment_category_id", {
          label: item.equipment_category?.name,
          value: item.equipment_category_id,
        });
      }
      return () => {};
    }, [id, item]);
  } else if (virtualId) {
    const virtualItem = virtualEquipmentItems.find(
      (item) => Number(item.id) === Number(virtualId)
    );
    useEffect(() => {
      if (virtualItem) {
        console.log(virtualItem);
        setValue("name", virtualItem.name);
        setValue("qty", virtualItem.qty);
        setValue("cost_price", virtualItem.cost_price);
        setValue("selling_price", virtualItem.selling_price);
        setValue("equipment_category_id", {
          label: virtualItem.equipment_category_id.label,
          value: virtualItem.equipment_category_id.value,
        });
      }
    }, [virtualItem]);
  }
  const onSubmit = async (data: any) => {
    if (!virtualId && !isBulkAdd) {
      data.equipment_category_id = data.equipment_category_id.value;
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
          toast.promise(updateEquipmentItem({ id, ...data }), {
            pending: "Updating Menu...",
            success: "Menu updated successfully!",
            error: "Error updating menu!",
          });
        } else {
          console.log("dids");
          toast.promise(updateEquipmentItem({ id, ...data }), {
            pending: "Updating Menu...",
            success: "Menu updated successfully!",
            error: "Error updating menu!",
          });
        }
      } else if (virtualId) {
        dispatch(editVirtualEquipmentItem({ id: Number(virtualId), data }));
      } else if (isBulkAdd) {
        dispatch(addEquipmentItem(data));
      } else {
        toast.promise(createEquipmentItem(data), {
          pending: "Adding Equipment...",
          success: "Equipment added successfully!",
          error: "Error adding Equipment!",
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
              {id && (
                <img
                  className="rounded-lg w-full h-40 object-cover"
                  src={
                    methods.getValues("image")
                      ? methods.getValues("image")
                      : "/shydan.jpg"
                  }
                  alt="No Image Available"
                />
              )}
              <AsyncAppSelect
                width={`${!isBulkAdd && "w-96"}`}
                name="equipment_category_id"
                label="Category"
                placeholder="Select Category"
                loadOptions={loadCategoryOptions}
              />
              <Input
                name="name"
                label="Equipment Name"
                placeholder="Equipment Name"
              />
              <Input
                name="qty"
                min={0}
                label="Equipment Quantity"
                placeholder="Equipment Quantity"
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
              {!id && (
                <Input
                  name="image"
                  label="Image"
                  placeholder="Image"
                  type="file"
                />
              )}
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
