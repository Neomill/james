import {
  useCreatePositionMutation,
  useGetPositionByIdQuery,
  useUpdatePositionMutation,
} from "@/redux/services/positionsAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { toast } from "react-toastify";

const PositionSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

interface Props {
  onClose: () => void;
  id?: string;
}

export const PositionForm: React.VFC<Props> = ({ onClose, id }) => {
  const methods = useForm({
    resolver: yupResolver(PositionSchema),
  });
  const [create, { isLoading: isCreating }] = useCreatePositionMutation();
  const [update, result] = useUpdatePositionMutation();

  if (id) {
    const { data: position, isLoading: isUpdating } = useGetPositionByIdQuery(
      id,
      {
        // pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
      }
    );
    useEffect(() => {
      if (position) {
        const { setValue } = methods;
        setValue("name", position.name);
      }
      return () => {};
    }, [id, position]);
  }

  const onSubmit = async (data: any) => {
    try {
      if (id) {
        toast.promise(update({ id, ...data }).unwrap(), {
          success: "Position updated successfully!",
          error: "Error updating position!",
          pending: "Updating position...",
        });
      } else {
        toast.promise(create(data).unwrap(), {
          success: "Position created successfully!",
          error: "Error creating position!",
          pending: "Creating position...",
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
                label="Position Name"
                placeholder="Position Name"
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
