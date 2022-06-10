import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/Input";
import { Button } from "../Button/index";
import { useAuth } from "@/hooks/useAuth";
import {
  useChangePasswordMutation,
  useChangeProfileMutation,
} from "@/redux/services/authAPI";
import { toast } from "react-toastify";

const changePasswordSchema = yup
  .object({
    current_pass: yup.string().required("Current Password is required."),
    new_pass: yup
      .string()
      .required("Password is required.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirm_pass: yup
      .string()
      .required("Confirm password is required.")
      .oneOf([yup.ref("new_pass"), null], "Passwords must match"),
  })
  .required();
const ChangePasswordForm = (props: any) => {
  const methods = useForm({
    resolver: yupResolver(changePasswordSchema),
  });
  const {
    setValue,
    formState: { errors },
    reset,
  } = methods;

  const [changePassword, { isLoading, isSuccess }] =
    useChangePasswordMutation();

  const onSubmit = async (data: any) => {
    try {
      await toast.promise(
        changePassword({
          oldPassword: data.current_pass,
          newPassword: data.new_pass,
        }).unwrap(),
        {
          success: "Password changed successfully.",
          pending: "Updating password.",
          error: "Incorrect password!",
        },
        {
          toastId: "change-password-toast",
        }
      );
      reset();
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="container grid grid-cols-3  items-center   py-3 mb-3">
          <h4 className="text-black font-semibold text-md">Current Password</h4>
          <div className="flex flex-col ">
            <Input
              type="password"
              label=""
              name="current_pass"
              placeholder=""
            />
            {errors["current_pass"] && (
              <p className="mt-2 text-xs block  text-red-500 mb-3">
                {errors["current_pass"].message}
              </p>
            )}
          </div>
        </div>
        <hr />
        <div className="container grid grid-cols-3  items-center   py-3 mb-3">
          <h4 className="text-black font-semibold text-md">New password</h4>
          <div className="flex flex-col ">
            <Input type="password" label="" name="new_pass" placeholder="" />
            {errors["new_pass"] && (
              <p className="mt-2 text-xs block  text-red-500 mb-3">
                {errors["new_pass"].message}
              </p>
            )}
          </div>
        </div>
        <hr />
        <div className="container grid grid-cols-3  items-center   py-3 mb-3">
          <h4 className="text-black font-semibold text-md">Confirm Password</h4>
          <div className="flex flex-col ">
            <Input
              type="password"
              label=""
              name="confirm_pass"
              placeholder=""
            />
            {errors["confirm_pass"] && (
              <p className="mt-2 text-xs block  text-red-500 mb-3">
                {errors["confirm_pass"].message}
              </p>
            )}
          </div>
        </div>

        <hr />
        <div className="flex flex-col  justify-end md:flex-row gap-3 mt-6">
          <Button
            type="submit"
            width="wide"
            size="medium"
            label="Save"
            colorScheme="primary"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default ChangePasswordForm;
