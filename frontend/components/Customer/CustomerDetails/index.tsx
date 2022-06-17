import LabeledText from "@/components/LabeledText";
import { useGetCustomerByIdQuery } from "@/redux/services/customersAPI";
import dayjs from "dayjs";

type Props = {
  id: string;
  onClose: () => void;
};

export interface CustomerProps {
  id: string;
  fname: string;
  lname: string;
  mname: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

const CustomerDetails = ({ id, onClose }: Props) => {
  const { data, isLoading } = useGetCustomerByIdQuery(id, {
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
        <LabeledText label="Address">{data.address}</LabeledText>
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

export default CustomerDetails;
