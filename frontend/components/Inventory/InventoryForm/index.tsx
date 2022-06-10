import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { addItem, editVirtualItem } from "@/redux/features/itemSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import AsyncAppSelect from "@/components/AsyncAppSelect";
import { useSearchBrandsQuery } from "@/redux/services/brandsAPI";
import { useSearchCategoryQuery } from "@/redux/services/categoriesAPI";
import { useSearchCompanyQuery } from "@/redux/services/companiesAPI";
import {
  useCreateItemMutation,
  useGetItemByIdQuery,
  useUpdateItemMutation,
} from "@/redux/services/itemsAPI";
import { useSearchStorageLocationsQuery } from "@/redux/services/storageLocationAPI";
import dayjs from "dayjs";
import { BsArrowClockwise, BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";
const InventorySchema = yup
  .object({
    name: yup.string().required(),
    desc: yup.string().optional(),
    qty: yup.number().moreThan(-1).integer().required(),
    cost_price: yup.number().positive().required(),
    selling_price: yup.number().positive().required(),
    date_received: yup.date().required(),
    expiry_date: yup.date().required(),
    category_id: yup.object().required(),
    brand_id: yup.object().required(),
    storage_location_id: yup.object().required(),
    company_id: yup.object().required(),
    stock_alert_ctr: yup.number().positive().integer().required(),
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
  stock_alert_ctr: "",
  cost_price: "",
  selling_price: "",
  category_id: null,
  brand_id: null,
  company_id: null,
  storage_location_id: null,
  date_received: null,
  expiry_date: null,
};

export const InventoryForm: React.FC<Props> = ({
  onClose,
  id,
  isBulkAdd = false,
  virtualId,
  children,
  ...props
}) => {
  const methods = useForm({
    resolver: yupResolver(InventorySchema),
  });
  const [updateItem] = useUpdateItemMutation();
  const dispatch = useAppDispatch();
  const { data: virtualItems } = useAppSelector((state) => state.items);
  const {
    setValue,
    reset,
    control,
    formState: { errors },
  } = methods;
  const [createItem] = useCreateItemMutation();

  const [categoryPage, setCategoryPage] = useState(0);
  const [categoryQuery, setCategoryQuery] = useState("");
  const [brandPage, setBrandPage] = useState(0);
  const [brandQuery, setBrandQuery] = useState("");
  const [companyPage, setCompanyPage] = useState(0);
  const [companyQuery, setCompanyQuery] = useState("");
  const [storageLocationPage, setStorageLocationPage] = useState(0);
  const [storageLocationQuery, setStorageLocationQuery] = useState("");

  const { data: categories } = useSearchCategoryQuery({
    page: categoryPage,
    query: categoryQuery,
  });
  const { data: brands } = useSearchBrandsQuery({
    page: brandPage,
    query: brandQuery,
  });
  const { data: storageLocations } = useSearchStorageLocationsQuery({
    page: storageLocationPage,
    query: storageLocationQuery,
  });
  const { data: companies } = useSearchCompanyQuery({
    page: companyPage,
    query: companyQuery,
  });

  async function loadCategoryOptions(search, loadedOptions, { page }) {
    setCategoryPage(page);
    setCategoryQuery(search);
    return {
      options: categories?.body.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      hasMore: categories.hasMore,
      additional: {
        page: page + 1,
      },
    };
  }

  async function loadBrandOptions(search, loadedOptions, { page }) {
    setBrandPage(page);
    setBrandQuery(search);
    return {
      options: brands?.body.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      hasMore: brands.hasMore,
      additional: {
        page: page + 1,
      },
    };
  }

  async function loadStorageLocationOptions(search, loadedOptions, { page }) {
    setStorageLocationPage(page);
    setStorageLocationQuery(search);
    return {
      options: storageLocations?.body.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      hasMore: storageLocations.hasMore,
      additional: {
        page: page + 1,
      },
    };
  }

  async function loadCompanyOptions(search, loadedOptions, { page }) {
    setCompanyPage(page);
    setCompanyQuery(search);
    return {
      options: companies?.body.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      hasMore: companies.hasMore,
      additional: {
        page: page + 1,
      },
    };
  }
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  if (id) {
    const { data: item, isLoading: isUpdating } = useGetItemByIdQuery(id, {
      // pollingInterval: 3000,
      refetchOnMountOrArgChange: true,
      skip: false,
    });
    useEffect(() => {
      if (item) {
        setValue("name", item.name);
        setValue("qty", item.qty);
        setValue("desc", item.desc);
        setValue("stock_alert_ctr", item.stock_alert_ctr);
        setValue("cost_price", item.cost_price);
        setValue("selling_price", item.selling_price);
        setValue("category_id", {
          label: item.category?.name,
          value: item.category_id,
        });
        setValue("brand_id", {
          label: item.brand?.name,
          value: item.brand_id,
        });
        setValue("company_id", {
          label: item.company?.name,
          value: item.company_id,
        });
        setValue("storage_location_id", {
          label: item.storage_location?.name,
          value: item.storage_location_id,
        });
        setValue("date_received", dayjs(new Date()).format("YYYY-MM-DD"));
        setValue("expiry_date", dayjs(new Date()).format("YYYY-MM-DD"));
      }

      return () => {};
    }, [id, item]);
  } else if (virtualId) {
    const virtualItem = virtualItems.find(
      (item) => Number(item.id) === Number(virtualId)
    );
    useEffect(() => {
      if (virtualItem) {
        console.log(virtualItem);
        setValue("name", virtualItem.name);
        setValue("qty", virtualItem.qty);
        setValue("desc", virtualItem.desc);
        setValue("stock_alert_ctr", virtualItem.stock_alert_ctr);
        setValue("cost_price", virtualItem.cost_price);
        setValue("selling_price", virtualItem.selling_price);
        setValue("category_id", {
          label: virtualItem.category_id.label,
          value: virtualItem.category_id.value,
        });
        setValue("brand_id", {
          label: virtualItem.brand_id.label,
          value: virtualItem.brand_id.value,
        });
        setValue("company_id", {
          label: virtualItem.company_id.label,
          value: virtualItem.company_id.value,
        });
        setValue("storage_location_id", {
          label: virtualItem.storage_location_id.label,
          value: virtualItem.storage_location_id.value,
        });
        setValue(
          "date_received",
          dayjs(virtualItem.date_received).format("YYYY-MM-DD")
        );
        setValue(
          "expiry_date",
          dayjs(virtualItem.expiry_date).format("YYYY-MM-DD")
        );
      }
    }, [virtualItem]);
  }
  const onSubmit = async (data: any) => {
    if (!virtualId && !isBulkAdd) {
      data.category_id = data.category_id.value;
      data.brand_id = data.brand_id.value;
      data.company_id = data.company_id.value;
      data.storage_location_id = data.storage_location_id.value;
    }
    try {
      if (id) {
        delete data.cost_price;
        delete data.selling_price;
        delete data.expiry_date;
        delete data.date_received;
        delete data.qty;
        toast.promise(updateItem({ id, ...data }), {
          pending: "Updating Item...",
          success: "Item updated successfully!",
          error: "Error updating item!",
        });
      } else if (virtualId) {
        dispatch(editVirtualItem({ id: Number(virtualId), data }));
      } else if (isBulkAdd) {
        dispatch(addItem(data));
      } else {
        toast.promise(createItem(data), {
          pending: "Adding Item...",
          success: "Item added successfully!",
          error: "Error adding item!",
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
            <div className={"grid grid-cols-2 gap-3 "}>
              <AsyncAppSelect
                width={`${!isBulkAdd && "w-72"}`}
                name="category_id"
                label="Category"
                placeholder="Select Category"
                loadOptions={loadCategoryOptions}
              />
              <AsyncAppSelect
                name="brand_id"
                label="Brand"
                placeholder="Select Brand"
                loadOptions={loadBrandOptions}
              />
              <AsyncAppSelect
                name="storage_location_id"
                label="Storage Location"
                placeholder="Select Storage Location"
                loadOptions={loadStorageLocationOptions}
              />

              <AsyncAppSelect
                name="company_id"
                placeholder="Select Company"
                label="Company"
                loadOptions={loadCompanyOptions}
              />
              <Input
                name="name"
                label="Product Name"
                placeholder="Product Name"
              />
              <Input
                name="desc"
                label="Product Desc"
                placeholder="Product Desc"
              />
              {!id && (
                <>
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
                  <Input
                    name="date_received"
                    label="Date Received"
                    placeholder="Date Received"
                    type="date"
                  />
                  <Input
                    name="expiry_date"
                    label="Expiry Date"
                    placeholder="Expiry Date"
                    type="date"
                  />
                </>
              )}
              <Input
                name="stock_alert_ctr"
                min={0}
                label="Stock Alert Counter"
                placeholder="Stock Alert Counter"
                type="number"
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
