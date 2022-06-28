import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
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
import AsyncAppSelect from "@/components/AsyncAppSelect";
import { useSearchBranchQuery } from "@/redux/services/branchAPI";

const EmployeeSchema = yup
  .object({
    fname: yup.string().required(),
    lname: yup.string().required(),
    phone: yup.string().required(),
    mname: yup.string().required(),
    address: yup.string().required(),
    branch_id: yup.object().required(),
    position_id: yup.object().required(),
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

  const [branchPage, setBranchPage] = useState(0);
  const [branchQuery, setBranchQuery] = useState("");

  const { data: menuItemCategoriesAPI } = useSearchBranchQuery({
    page: branchPage,
    query: branchQuery,
  });

  async function loadBranchOptions(search, loadedOptions, { page }) {
    setBranchPage(page);
    setBranchQuery(search);
    return {
      options: menuItemCategoriesAPI?.body.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      hasMore: menuItemCategoriesAPI.hasMore,
      additional: {
        page: page + 1,
      },
    };
  }


const [positionPage, setPositionPage] = useState(0);
  const [positionQuery, setPositionQuery] = useState("");

  const { data: positionAPI } = useGetPositionsQuery(
    { page: 0 }
  );

  async function loadPositionOptions(search, loadedOptions, { page }) {
    setPositionPage(page);
    setPositionQuery(search);
    return {
      options: positionAPI?.body.map((item) => ({
        value: item.id,
        label: item.name,
      }))
    };
  }

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
        setValue("branch_id", {
          label: employee.branch.name,
          value: employee.branch.id,
        });
        setValue("position_id", {
          label: employee.position.name,
          value: employee.position?.id,
        });
      }
      return () => {};
    }, [id, employee]);
  }

  const onSubmit = async (data: any) => {
    data.position_2 = data.position_id.value
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
              label="First Name"
              placeholder="Juan"
            />
            <Input
              name="mname"
              label="Middle Name"
              placeholder="Fuastino"
            />
            <Input
              name="lname"
              label="Last Name"
              placeholder="Dela Cruz"
            />
          </div>

          <div style={{ width: "100%" }} className=" flex flex-row gap-2 ">
            <Input
              name="phone"
              label="Phone #"
              placeholder="Phone #"
            />
            <AsyncAppSelect
                width={""}
                name="branch_id"
                label="Branch"
                placeholder="Select Branch"
                loadOptions={loadBranchOptions}
            />
            <AsyncAppSelect
                width={""}
                name="position_id"
                label="Position"
                placeholder="Select Position"
                loadOptions={loadPositionOptions}
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
