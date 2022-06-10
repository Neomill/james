import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { useSignInMutation } from "@/redux/services/authAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { MdOutlineLock } from "react-icons/md";
import * as yup from "yup";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/Loading";

const LoginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const SignIn = () => {
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const [signIn, { isLoading, isSuccess }] = useSignInMutation();
  const router = useRouter();
  const { user } = useAuth();

  const onLogin = async (data) => {
    try {
      await signIn(data).unwrap();
      router.push("/");
      toast.success("Logged In Successfully!", {
        toastId: "sign-in-success",
      });
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!", {
        toastId: "sign-in-error",
      });
    }
  };
  if (user) {
    router.push("/");
  } else {
    return (
      <div className="text-gray-700 items-center justify-center flex flex-col h-screen bg-blue-50">
        <div className="relative flex flex-col gap-4 bg-white w-80  rounded-2xl p-9 shadow-sm">
          <div className="transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 flex flex-col items-center justify-center -top-6 -right-5 absolute h-20 w-20 rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/50">
            <MdOutlineLock className="w-9 h-9 text-white" />
          </div>
          <div>
            <h4 className="text-blue-500 font-bold">shydan</h4>
            <h1 className="font-bold text-2xl">Log In to Shydan</h1>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onLogin)}>
              <div className="">
                <Input
                  name="username"
                  label="Username"
                  placeholder="Enter username"
                />
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter password"
                />
              </div>
              <Button
                type="submit"
                className="mt-6"
                width="full"
                size="large"
                label="SIGN IN"
              />
            </form>
          </FormProvider>
        </div>
      </div>
    );
  }
  return (
    <Loading title="Checking credentials" message="Loading, please wait..." />
  );
};

export default SignIn;
