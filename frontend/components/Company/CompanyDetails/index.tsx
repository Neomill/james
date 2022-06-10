import { useGetCompanyByIdQuery } from "@/redux/services/companiesAPI";
import dayjs from "dayjs";
import LabeledText from "@/components/LabeledText";

type Props = {
  id: string;
  onClose: () => void;
};

export interface CompanyProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  representative: any;
  createdAt: string;
  updatedAt: string;
}

const CompanyDetails = ({ id, onClose }: Props) => {
  const { data, isLoading } = useGetCompanyByIdQuery(id, {
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
        <LabeledText label="Company Name">{data.name}</LabeledText>
        <LabeledText label="Representative">
          {data.representative.fname + " " + data.representative.lname}
        </LabeledText>
        <LabeledText label="Company Address">{data.address}</LabeledText>
        <LabeledText label="Representative Address">
          {data.representative.address}
        </LabeledText>
        <LabeledText label="Company Phone">{data.phone}</LabeledText>

        <LabeledText label="Representative Phone">
          {data.representative.phone}
        </LabeledText>

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

export default CompanyDetails;
