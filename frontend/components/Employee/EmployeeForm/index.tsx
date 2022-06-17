import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/Button";
import Select from "@/components/Select";
import Input from "@/components/Input";
import {
  useUpdateEmployeeMutation,
  useCreateEmployeeMutation,
  useGetEmployeeByIdQuery,
} from "@/redux/services/employeesAPI";
import { useGetPositionsQuery } from "@/redux/services/positionsAPI";
import { toast } from "react-toastify";
const EmployeeSchema = yup
  .object({
    fname: yup.string().required(),
    lname: yup.string().required(),
    phone: yup.string().required(),
    branch: yup.string().required(),
    mname: yup.string().required(),
    address: yup.string().required(),
    position_id: yup.string().required(),
  })
  .required();
interface Props {
  onClose: () => void;
  id?: string;
}

export const EmployeeForm: React.VFC<Props> = ({ onClose, id }) => {
  const {
    data: position,
    error,
    isLoading,
  } = useGetPositionsQuery({ page: 0 });
  const methods = useForm({
    resolver: yupResolver(EmployeeSchema),
  });
  const [update, result] = useUpdateEmployeeMutation();
  const [create, { isLoading: isCreating }] = useCreateEmployeeMutation();

  if (id) {
    const { data: employee, isLoading: isUpdating } = useGetEmployeeByIdQuery(
      id,
      {
        // pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
      }
    );
    useEffect(() => {
      if (employee) {
        const { setValue } = methods;
        setValue("fname", employee.fname);
        setValue("lname", employee.lname);
        setValue("mname", employee.mname);
        setValue("phone", employee.phone);
        setValue("address", employee.address);
        setValue("branch_id", employee.branch_id);
        setValue("position_id", employee.position?.id);
      }
      return () => {};
    }, [id, employee]);
  }

  const onSubmit = async (data: any) => {
    try {
      if (id) {
        toast.promise(update({ id, ...data }).unwrap(), {
          success: "Employee updated successfully!",
          error: "Error updating employee!",
          pending: "Updating employee...",
        });
      } else {
        toast.promise(create(data).unwrap(), {
          success: "Employee created successfully!",
          error: "Error creating employee!",
          pending: "Creating employee...",
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
              label="Employee First Name"
              placeholder="Employee First Name"
            />
            <Input
              name="mname"
              label="Employee Middle Name"
              placeholder="Employee Middle Name"
            />
            <Input
              name="lname"
              label="Employee Last Name"
              placeholder="Employee Last Name"
            />
          </div>

          <div style={{ width: "100%" }} className=" flex flex-row gap-2 ">
            <Input
              name="phone"
              label="Employee Phone"
              placeholder="Employee Phone"
            />
             <Input
              name="branch_id"
              label="Branch"
              placeholder="Branch id"
            />
            <Select
              options={position?.body}
              name="position_id"
              placeholder="Select Employee Position"
              label="Employee Position"
            />
          </div>

          <Input
            style={{ width: "100% !important" }}
            name="address"
            label="Employee Address"
            placeholder="Employee Address"
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
