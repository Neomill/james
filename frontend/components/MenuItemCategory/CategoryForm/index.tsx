import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryByIdQuery,
} from "@/redux/services/categoriesAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { toast } from "react-toastify";
import {
  useCreateMenuItemCategoryMutation,
  useGetMenuItemCategoryByIdQuery,
  useUpdateMenuItemCategoryMutation,
} from "@/redux/services/menuItemCategoriesAPI";
import { useAuth } from "@/hooks/useAuth";
import Branch from "@/pages/branch";


const MenuItemCategorySchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

interface Props {
  onClose: () => void;
  id?: string;
}

export const MenuItemCategoryForm: React.VFC<Props> = ({ onClose, id }) => {
  const methods = useForm({
    resolver: yupResolver(MenuItemCategorySchema),
  });
  const [create, { isLoading: isCreating }] =
    useCreateMenuItemCategoryMutation();
  const [update, result] = useUpdateMenuItemCategoryMutation();
  const { user } = useAuth();
  if (id) {
    const { data: category, isLoading: isUpdating } =
      useGetMenuItemCategoryByIdQuery(id, {
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
      });
    useEffect(() => {
      if (category) {
        const { setValue } = methods;
        setValue("name", category.name);
      }
      return () => {};
    }, [id, category]);
  }

  const onSubmit = async (data: any) => {
    data.branch_id = user.employee.branch.id
    console.log(data)
    try {
      if (id)
        toast.promise(update({ id, ...data }).unwrap(), {
          success: "Category updated successfully!",
          error: "Error updating category!",
          pending: "Updating category...",
        });
      else
        toast.promise(create(data).unwrap(), {
          success: "Category created successfully!",
          error: "Error creating category!",
          pending: "Creating category...",
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
              <Input
                name="name"
                label="Category Name"
                placeholder="Category Name"
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
