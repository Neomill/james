import { Button } from "@/components/Button";
import DisabledText from "@/components/DisabledText";
import Input from "@/components/Input";
import {
  useLazyGetItemTransactionByIdQuery,
  useUpdateItemTransactionMutation,
} from "@/redux/services/itemTransactionAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ItemTransactionProps } from "../ItemTransactionDetails";

const ItemTransactionSchema = yup
  .object({
    qty: yup.number().moreThan(-1).integer().required(),
    date_received: yup.date().required(),
    expiry_date: yup.date().required(),
  })
  .required();

interface Props {
  onClose: () => void;
  id?: string;
}

export const ItemTransactionForm: React.VFC<Props> = ({ onClose, id }) => {
  const methods = useForm({
    resolver: yupResolver(ItemTransactionSchema),
  });
  const { setValue } = methods;
  const [update, result] = useUpdateItemTransactionMutation();
  const [lazyGetItemTransactionById] = useLazyGetItemTransactionByIdQuery();
  const [itemTransaction, setItemTransaction] =
    useState<ItemTransactionProps | null>(null);
  if (id) {
    useEffect(() => {
      const getItemTransaction = async () => {
        const res = await lazyGetItemTransactionById(id).unwrap();
        setItemTransaction(res);
        setValue("qty", res.qty);
        setValue(
          "date_received",
          dayjs(res.date_received).format("YYYY-MM-DD")
        );
        setValue("expiry_date", dayjs(res.expiry_date).format("YYYY-MM-DD"));
      };
      getItemTransaction();
      return () => {};
    }, [id]);
  }

  const onSubmit = async (data: any) => {
    try {
      if (id)
        toast.promise(update({ id, ...data }).unwrap(), {
          success: "Transaction updated successfully!",
          error: "Error updating transaction!",
          pending: "Updating transaction...",
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
              {itemTransaction && (
                <DisabledText label="Item Name">
                  {itemTransaction?.item.name}
                </DisabledText>
              )}
              <Input
                type="number"
                min={1}
                name="qty"
                label="Quantity"
                placeholder="Enter Quantity"
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
