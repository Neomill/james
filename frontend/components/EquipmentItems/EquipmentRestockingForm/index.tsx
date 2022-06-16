import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { useAppDispatch } from "@/redux/hooks";

import DisabledText from "@/components/DisabledText";
import {
  useGetItemByIdQuery,
  useRestockItemMutation,
  useUpdateItemMutation,
} from "@/redux/services/itemsAPI";
import { toast } from "react-toastify";
const InventorySchema = yup
  .object({
    qty: yup.number().moreThan(-1).integer().required(),
    price: yup.number().positive().required(),
  })
  .required();

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  onClose?: () => void;
  id: string;
}

const defaultValues = {
  qty: null,
};

export const RestockingForm: React.FC<Props> = ({
  onClose,
  id,
  children,
  ...props
}) => {
  const methods = useForm({
    resolver: yupResolver(InventorySchema),
  });
  const [restockItem] = useRestockItemMutation();
  const dispatch = useAppDispatch();
  const {
    setValue,
    reset,
    control,
    formState: { errors },
  } = methods;
  const { data: item, isLoading: isUpdating } = useGetItemByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const onSubmit = async (data: any) => {
    try {
      if (id) {
        toast.promise(restockItem({ id, ...data }), {
          pending: "Restocking Item...",
          success: "Item restocked successfully!",
          error: "Error restocking item!",
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
            <div className={"flex flex-col w-96"}>
              {item && (
                <>
                  <DisabledText label="Item Name">{item.name}</DisabledText>
                  <DisabledText label="Item Qty">{item?.qty}</DisabledText>
                  <hr />
                </>
              )}
              <Input
                name="qty"
                min={0}
                label="Quantity to add"
                placeholder="Quantity to add"
                type="number"
              />
              <Input
                name="price"
                isDecimal
                min={0}
                label="Retail price"
                placeholder="Retail price"
                type="number"
                step="any"
              />
              <div className="col-span-2 flex flex-col mt-6 justify-end md:flex-row gap-3">
                <Button
                  type="submit"
                  width="wide"
                  size="medium"
                  label="Restock"
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
