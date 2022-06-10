import { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { BsBoxArrowLeft, BsTrashFill } from "react-icons/bs";

type Props = {
  pullout?: boolean;
  bulkDelete?: boolean;
  page: number;
  totalPages: number;
  model: string;
  onModalOpen: any;
};

const BulkOperations = ({
  pullout = false,
  page,
  totalPages,
  model,
  bulkDelete = false,
  onModalOpen,
}: Props) => {
  const router = useRouter();
  return (
    <div className="flex w-full justify-between">
      <div className="text-sm text-gray-500 items-center justify-center flex gap-4">
        {bulkDelete && (
          <div
            onClick={onModalOpen}
            data-modal={`bulk-delete-${model}-modal`}
            className="flex gap-2 cursor-pointer items-center"
          >
            <IconContext.Provider value={{ size: `16` }}>
              <BsTrashFill />
            </IconContext.Provider>
            <small>Delete Selected</small>
          </div>
        )}

        {pullout && (
          <div
            onClick={(e) => {
              router.push("/po-requests/bulk-add");
            }}
            className="flex gap-2 cursor-pointer"
          >
            <IconContext.Provider value={{ size: `18` }}>
              <BsBoxArrowLeft />
            </IconContext.Provider>
            Pullout
            <small></small>
          </div>
        )}
      </div>
      <div className="text-xs flex text-gray-400 items-center gap-6">
        <p>
          {page + 1} of {totalPages + 1}
        </p>
      </div>
    </div>
  );
};

export default BulkOperations;
