import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/Input";
import { Button } from "../Button/index";
import { useAuth } from "@/hooks/useAuth";
import { useChangeProfileMutation } from "@/redux/services/authAPI";
import { toast } from "react-toastify";

const editProfileSchema = yup
  .object({
    username: yup
      .string()
      .min(5, "Username must contain atleast 5 characters.")
      .required(),
  })
  .required();
const EditProfileForm = (props: any) => {
  const methods = useForm({
    resolver: yupResolver(editProfileSchema),
  });

  const [changeProfile, { isLoading, isSuccess }] = useChangeProfileMutation();

  const {
    setValue,
    formState: { errors },
  } = methods;

  const { user } = useAuth();

  useEffect(() => {
    setValue("username", user.username);
  }, [user]);

  const onSubmit = async (data: any) => {
    try {
      await toast.promise(
        changeProfile(data).unwrap(),
        {
          success: "Profile updated successfully.",
          pending: "Updating profile.",
          error: "Username already exists!",
        },
        {
          toastId: "change-profile-toast",
        }
      );
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="container grid grid-cols-3  items-center   py-3 mb-3">
          <h4 className="text-black font-semibold text-md">Username</h4>
          <div className="flex flex-col ">
            <Input label="" name="username" placeholder="" />
            {errors["username"] && (
              <p className="mt-2 text-xs block  text-red-500 mb-3">
                {errors["username"].message}
              </p>
            )}
          </div>
        </div>
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

export default EditProfileForm;
