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
    <div className="w-full bg-gray-200 drop-shadow-sm py-5 px-8">
      <div className="items-center justify-between flex flex-row" >
        <div className="flex flex-row items-center gap-4">
          <div>
            <h1 className="text-xl text-neutral-900 font-bold" >
            Login as <p className="capitalize inline text-lg">{name}</p>
            </h1>
            <p className="text-xs">Branch 1 - Tacloban City</p>
          </div>
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
              color:'red'
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
    </div>
  );
};

export default Header;
