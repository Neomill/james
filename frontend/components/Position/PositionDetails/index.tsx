import { useGetPositionByIdQuery } from "@/redux/services/positionsAPI";
import dayjs from "dayjs";
import LabeledText from "@/components/LabeledText";

type Props = {
  id: string;
  onClose: () => void;
};

export interface PositionProps {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const PositionDetails = ({ id, onClose }: Props) => {
  const { data, isLoading } = useGetPositionByIdQuery(id, {
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
        <LabeledText label="Name">{data.name}</LabeledText>
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

export default PositionDetails;
