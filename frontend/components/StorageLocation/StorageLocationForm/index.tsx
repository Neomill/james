import { Button } from "@/components/Button";
import Input from "@/components/Input";
import {
  useCreateStorageLocationMutation,
  useGetStorageLocationByIdQuery,
  useUpdateStorageLocationMutation,
} from "@/redux/services/storageLocationAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const StorageLocationSchema = yup
  .object({
    name: yup.string().required(),
    address: yup.string().required(),
  })
  .required();

interface Props {
  onClose: () => void;
  id?: string;
}

export const StorageLocationForm: React.VFC<Props> = ({ onClose, id }) => {
  const methods = useForm({
    resolver: yupResolver(StorageLocationSchema),
  });
  const [create, { isLoading: isCreating }] =
    useCreateStorageLocationMutation();
  const [update, result] = useUpdateStorageLocationMutation();

  if (id) {
    const { data: storageLocation, isLoading: isUpdating } =
      useGetStorageLocationByIdQuery(id, {
        // pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
      });
    useEffect(() => {
      if (storageLocation) {
        const { setValue } = methods;
        setValue("name", storageLocation.name);
        setValue("address", storageLocation.address);
      }
      return () => {};
    }, [id, storageLocation]);
  }

  const onSubmit = async (data: any) => {
    try {
      if (id) {
        toast.promise(update({ id, ...data }).unwrap(), {
          success: "Storage location updated successfully!",
          error: "Error updating storage location!",
          pending: "Updating storage location...",
        });
      } else {
        toast.promise(create(data).unwrap(), {
          success: "Storage location created successfully!",
          error: "Error creating storage location!",
          pending: "Creating storage location...",
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
              <Input
                name="name"
                label="Storage Location Name"
                placeholder="Storage Location Name"
              />
              <Input
                name="address"
                label="Storage Location Address"
                placeholder="Storage Location Address"
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
