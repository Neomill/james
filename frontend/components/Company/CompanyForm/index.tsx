import {
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useGetCompanyByIdQuery,
} from "@/redux/services/companiesAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { toast } from "react-toastify";

const CompanySchema = yup
  .object({
    name: yup.string().required(),
    address: yup.string().required(),
    phone: yup.string().required(),
    rep_fname: yup.string().required(),
    rep_mname: yup.string().required(),
    rep_lname: yup.string().required(),
    rep_phone: yup.string().required(),
    rep_address: yup.string().required(),
  })
  .required();

interface Props {
  onClose: () => void;
  id?: string;
}

export const CompanyForm: React.VFC<Props> = ({ onClose, id }) => {
  console.count(`render ${id ? "update" : "create"}`);

  const methods = useForm({
    resolver: yupResolver(CompanySchema),
  });
  const [create, { isLoading: isCreating }] = useCreateCompanyMutation();
  const [update, result] = useUpdateCompanyMutation();

  if (id) {
    const { data: company, isLoading: isUpdating } = useGetCompanyByIdQuery(
      id,
      {
        // pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
      }
    );
    useEffect(() => {
      if (company) {
        const { setValue } = methods;
        setValue("name", company.name);
        setValue("address", company.address);
        setValue("phone", company.phone);
        setValue("rep_fname", company.representative.fname);
        setValue("rep_mname", company.representative.mname);
        setValue("rep_lname", company.representative.lname);
        setValue("rep_address", company.representative.address);
        setValue("rep_phone", company.representative.phone);
      }
      return () => {};
    }, [id, company]);
  }

  const onSubmit = async (data: any) => {
    try {
      if (id) {
        toast.promise(update({ id, ...data }).unwrap(), {
          success: "Supplier updated successfully!",
          error: "Error updating supplier!",
          pending: "Updating supplier...",
        });
      } else {
        toast.promise(create(data).unwrap(), {
          success: "Supplier created successfully!",
          error: "Error creating supplier!",
          pending: "Creating supplier...",
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
            <div style={{ width: "50%" }} className="flex flex-col gap-2 ">
              <Input
                name="name"
                label="Company Name"
                placeholder="Company Name"
              />
              <Input
                name="phone"
                label="Company Phone"
                placeholder="Company Phone"
              />
              <Input
                name="address"
                label="Company Address"
                placeholder="Company Address"
              />
            </div>
            <div
              style={{ width: "50%" }}
              className="md:pl-4 flex flex-col gap-2 "
            >
              <Input
                name="rep_fname"
                label="Representative First Name"
                placeholder="First Name"
              />
              <Input
                name="rep_mname"
                label="Representative Middle Name"
                placeholder="Middle Name"
              />
              <Input
                name="rep_lname"
                label="Representative Last Name"
                placeholder="Last Name"
              />
              <Input
                name="rep_phone"
                label="Representative Phone"
                placeholder="Phone"
              />
              <Input
                name="rep_address"
                label="Representative Address"
                placeholder="Address"
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
