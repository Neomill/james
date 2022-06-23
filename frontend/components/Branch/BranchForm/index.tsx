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
  useCreateBranchMutation,
  useGetBranchByIdQuery,
  useUpdateBranchMutation,
} from "@/redux/services/branchAPI";

const BranchSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

interface Props {
  onClose: () => void;
  id?: string;
}

export const BranchForm: React.VFC<Props> = ({ onClose, id }) => {
  const methods = useForm({
    resolver: yupResolver(BranchSchema),
  });
  const [create, { isLoading: isCreating }] =
    useCreateBranchMutation();
  const [update, result] = useUpdateBranchMutation();

  if (id) {
    const { data: branch, isLoading: isUpdating } =
      useGetBranchByIdQuery(id, {
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
      });
    useEffect(() => {
      if (branch) {
        const { setValue } = methods;
        setValue("name", branch.name);
        setValue("address", branch.address);
      }
      return () => {};
    }, [id, branch]);
  }

  const onSubmit = async (data: any) => {
    try {
      if (id)
        toast.promise(update({ id, ...data }).unwrap(), {
          success: "Branch updated successfully!",
          error: "Error updating Branch!",
          pending: "Updating Branch...",
        });
      else
        toast.promise(create(data).unwrap(), {
          success: "Branch created successfully!",
          error: "Error creating Branch!",
          pending: "Creating Branch...",
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
                label="Branch Name"
                placeholder="Branch Name"
              />
              <Input
                name="address"
                label="Branch Address"
                placeholder="Branch Address"
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
