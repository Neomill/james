import { resetCredentials } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { BsGrid1X2, BsPower } from "react-icons/bs";

type Props = {
  iconSize?: number;
  name: string;
  icon?: any;
  title: string;
};

const Header = ({
  title = "Dashboard",
  iconSize = 20,
  name = "Administrator",
  icon = <BsGrid1X2 />,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div className="w-full bg-white drop-shadow-sm items-center justify-between flex flex-row  py-4 px-6">
      <div className="flex flex-row items-center gap-4">
        <div className="bg-blue-50 p-3 rounded-full">
          <IconContext.Provider
            value={{
              className: "cursor-pointer text-blue-500",
              size: `${iconSize}`,
            }}
          >
            {icon}
          </IconContext.Provider>
        </div>
        <h1 className=" font-medium">{title}</h1>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="bg-gray-100 px-6 py-2 rounded-full">
          <p className="capitalize text-sm">{name}</p>
        </div>
        <IconContext.Provider
          value={{
            className:
              "cursor-pointer hover:text-red-500 transition ease-in-out duration-200",
            size: `${iconSize}`,
          }}
        >
          <BsPower
            onClick={() => {
              dispatch(resetCredentials());
              router.push("/auth/sign-in");
            }}
          />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Header;
