import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/Button";
import Select from "@/components/Select";
import Input from "@/components/Input";
import {
  useUpdateCustomerMutation,
  useCreateCustomerMutation,
  useGetCustomerByIdQuery,
} from "@/redux/services/customersAPI";
import { useGetPositionsQuery } from "@/redux/services/positionsAPI";
import { toast } from "react-toastify";
const customerschema = yup
  .object({
    fname: yup.string().required(),
    lname: yup.string().required(),
    phone: yup.string().required(),
    mname: yup.string().required(),
    address: yup.string().required(),
  })
  .required();
interface Props {
  onClose: () => void;
  id?: string;
}

export const CustomerForm: React.VFC<Props> = ({ onClose, id }) => {
  const {
    data: position,
    error,
    isLoading,
  } = useGetPositionsQuery({ page: 0 });
  const methods = useForm({
    resolver: yupResolver(customerschema),
  });
  const [update, result] = useUpdateCustomerMutation();
  const [create, { isLoading: isCreating }] = useCreateCustomerMutation();

  if (id) {
    const { data: customer, isLoading: isUpdating } = useGetCustomerByIdQuery(
      id,
      {
        // pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
      }
    );
    useEffect(() => {
      if (customer) {
        const { setValue } = methods;
        setValue("fname", customer.fname);
        setValue("lname", customer.lname);
        setValue("mname", customer.mname);
        setValue("phone", customer.phone);
        setValue("address", customer.address);
      }
      return () => {};
    }, [id, customer]);
  }

  const onSubmit = async (data: any) => {
    try {
      if (id) {
        toast.promise(update({ id, ...data }).unwrap(), {
          success: " updated successfully!",
          error: "Error updating !",
          pending: "Updating ...",
        });
      } else {
        toast.promise(create(data).unwrap(), {
          success: " created successfully!",
          error: "Error creating !",
          pending: "Creating ...",
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
        <div className={" border-0 flex flex-col gap-2"}>
          <div style={{ width: "100%" }} className="flex flex-row  gap-2 ">
            <Input
              name="fname"
              label=" First Name"
              placeholder=" First Name"
            />
            <Input
              name="mname"
              label=" Middle Name"
              placeholder=" Middle Name"
            />
            <Input
              name="lname"
              label=" Last Name"
              placeholder=" Last Name"
            />
          </div>

          <Input
            style={{ width: "100% !important" }}
            name="phone"
            label=" Phone"
            placeholder=" Phone"
          />


          <Input
            style={{ width: "100% !important" }}
            name="address"
            label=" Address"
            placeholder=" Address"
          />
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
