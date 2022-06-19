import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryByIdQuery,
} from "@/redux/services/categoriesAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { toast } from "react-toastify";
import {
  useCreatePullOutMutation,
  useGetPullOutByIdQuery,
  useUpdatePullOutMutation,
} from "@/redux/services/pullOutAPI";
import {useSearchMenuItemsQuery} from "@/redux/services/menuItemsAPI";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AsyncAppSelect from "@/components/AsyncAppSelect";

const PullOutSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

interface Props {
  onClose: () => void;
  id?: string;
}

export const PullOutForm: React.VFC<Props> = ({ onClose, id }) => {

  const [menuItemsPage, setMenuItemPage] = useState(0);
    const [menuItemsQuery, setMenuItemQuery] = useState("");
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.menuItems);
  
    const { data: menuItemsAPI } = useSearchMenuItemsQuery({
      page: menuItemsPage,
      query: menuItemsQuery,
    });
  
    async function loadMenuItemOptions(search, loadedOptions, { page }) {
      setMenuItemPage(page);
      setMenuItemQuery(search);
      return {
        options: menuItemsAPI?.body?.map((item) => ({
          value: item.id,
          label: item.name,
        })),
        hasMore: menuItemsAPI.hasMore,
        additional: {
          page: page + 1,
        },
      };
    }

  const methods = useForm({
    resolver: yupResolver(PullOutSchema),
  });
  const [create, { isLoading: isCreating }] =
    useCreatePullOutMutation();
  const [update, result] = useUpdatePullOutMutation();

  if (id) {
    const { data: pullOut, isLoading: isUpdating } =
      useGetPullOutByIdQuery(id, {
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
      });
    useEffect(() => {
      if (pullOut) {
        const { setValue } = methods;
        setValue("name", pullOut.name);
      }
      return () => {};
    }, [id, pullOut]);
  }

  const onSubmit = async (data: any) => {
    try {
      if (id)
        toast.promise(update({ id, ...data }).unwrap(), {
          success: "Pull Out updated successfully!",
          error: "Error updating Pull Out!",
          pending: "Updating Pull Out...",
        });
      else
        toast.promise(create(data).unwrap(), {
          success: "Pull Out created successfully!",
          error: "Error creating Pull Out!",
          pending: "Creating Pull Out...",
        });
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={" border-0 flex flex-col gap-9"}>
          <div
            className={["justify-between flex flex-col md:flex-row gap-3"].join(
              " "
            )}
          >
            <div className="w-96 flex flex-col gap-2 ">
              <AsyncAppSelect
                width={`w-50`}
                name="menu_item"
                label="product"
                placeholder="Select Product to Pull Out"
                loadOptions={loadMenuItemOptions}
              />

                <Input
                  name="description"
                  label="Description"
                  placeholder="description or reason"
                />

                <Input
                  name="qty"
                  min={0}
                  label="Product Quantity"
                  placeholder="Product Quantity"
                  type="number"
                />
            </div>
          </div>
          <div className="flex flex-col  justify-end md:flex-row gap-3">
            <Button
              type="submit"
              width="wide"
              size="medium"
              label={id ? "Update" : "Submit"}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
