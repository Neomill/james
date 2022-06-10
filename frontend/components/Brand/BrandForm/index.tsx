import { Button } from "@/components/Button";
import Input from "@/components/Input";
import {
  useCreateBrandMutation,
  useGetBrandByIdQuery,
  useUpdateBrandMutation,
} from "@/redux/services/brandsAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const BrandSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

interface Props {
  onClose: () => void;
  id?: string;
}

export const BrandForm: React.VFC<Props> = ({ onClose, id }) => {
  const methods = useForm({
    resolver: yupResolver(BrandSchema),
  });
  const [create, { isLoading: isCreating }] = useCreateBrandMutation();
  const [update, result] = useUpdateBrandMutation();

  if (id) {
    const { data: brand, isLoading: isUpdating } = useGetBrandByIdQuery(id, {
      // pollingInterval: 3000,
      refetchOnMountOrArgChange: true,
      skip: false,
    });
    useEffect(() => {
      if (brand) {
        const { setValue } = methods;
        setValue("name", brand.name);
      }
      return () => {};
    }, [id, brand]);
  }

  const onSubmit = async (data: any) => {
    try {
      if (id) {
        toast.promise(update({ id, ...data }).unwrap(), {
          success: "Brand updated successfully!",
          error: "Error updating brand!",
          pending: "Updating brand...",
        });
      } else {
        toast.promise(create(data).unwrap(), {
          success: "Brand created successfully!",
          error: "Error creating brand!",
          pending: "Creating brand...",
        });
      }
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
              <Input name="name" label="Brand Name" placeholder="Brand Name" />
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
