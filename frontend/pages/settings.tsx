import EditProfileForm from "@/components/EditProfileForm";
import Layout from "@/components/Layout";
import { ReactElement } from "react";
import { BsGear } from "react-icons/bs";
import ChangePasswordForm from "../components/ChangePasswordForm";
const Settings = ({}) => {
  return (
    <>
      <div className="container p-10">
        <h1 className="text-black text-2xl font-semibold block">
          Edit Profile
        </h1>
        <p className="mt-2 text-sm block  text-gray-500 mb-3">
          Change your profile information.
        </p>
        <hr />
        <EditProfileForm />
      </div>
      <hr />
      <div className="container p-10">
        <h1 className="text-black text-2xl font-semibold block">
          Change Password
        </h1>
        <p className="mt-2 text-sm block  text-gray-500 mb-3">
          Please enter your current password to change your password.
        </p>
        <hr />
        <ChangePasswordForm />
      </div>
    </>
  );
};

export default Settings;

Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout icon={<BsGear />} title="Settings">
      {page}
    </Layout>
  );
};
