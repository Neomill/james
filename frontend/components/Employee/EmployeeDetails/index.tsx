import LabeledText from "@/components/LabeledText";
import { useGetEmployeeByIdQuery } from "@/redux/services/employeesAPI";
import dayjs from "dayjs";

type Props = {
  id: string;
  onClose: () => void;
};

export interface EmployeeProps {
  id: string;
  fname: string;
  lname: string;
  mname: string;
  phone: string;
  address: string;
  representative: any;
  position: any;
  branch_id: string;
  branch: any;
  position_id: string;
  createdAt: string;
  updatedAt: string;
}

const EmployeeDetails = ({ id, onClose }: Props) => {
  const { data, isLoading } = useGetEmployeeByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>Wow! Such empty.</div>;
  }
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="grid grid-cols-2 gap-3 w-96">
        <LabeledText label="First Name">{data.fname}</LabeledText>
        <LabeledText label="Middle Name">{data.mname}</LabeledText>
        <LabeledText label="Last Name">{data.lname}</LabeledText>
        <LabeledText label="Phone">{data.phone}</LabeledText>
        <LabeledText label="Branch">{data.branch.name}</LabeledText>
        <LabeledText label="Address">{data.address}</LabeledText>
        <LabeledText label="Position">{data.position.name}</LabeledText>
        <LabeledText label="Date Created">
          {dayjs(data.createdAt).format("YYYY-MM-DD")}
        </LabeledText>
        <LabeledText label="Date Updated">
          {dayjs(data.updatedAt).format("YYYY-MM-DD")}
        </LabeledText>
      </div>
    </div>
  );
};

export default EmployeeDetails;
