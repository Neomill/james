import ActionButton from "@/components/ActionButton";
import AppModal from "@/components/AppModal";
import { Button } from "@/components/Button";
import Forbidden from "@/components/Forbidden";
import Layout from "@/components/Layout";
import { PORequestForm } from "@/components/PORequest/PORequestForm";
import StyledTable from "@/components/StyledTable";
import { useAuth } from "@/hooks/useAuth";
import {
  removeVirtualPOR,
  resetPORState,
} from "@/redux/features/poRequestSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCreateManyPORequestMutation } from "@/redux/services/poRequestAPI";
import checkPermissions from "@/utils/checkPermissions";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useMemo, useState } from "react";
import { BsArrowLeft, BsBoxArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";

type Props = {};

const BulkCreatePoRequest = (props: Props) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.poRequest);
  const [modal, setModal] = useState<string>("");
  const [selectedId, setSelectedId] = useState("");
  const [createMany] = useCreateManyPORequestMutation();
  const { user } = useAuth();
  const router = useRouter();

  const onModalOpen = (event, id?) => {
    event.preventDefault();
    const modal = event.currentTarget.getAttribute("data-modal");

    if (id) {
      setSelectedId(id);
    }
    if (modal) setModal(modal);
  };

  const onModalClose = () => {
    setModal("");
  };

  const columns = useMemo(
    () => [
      {
        Header: "Request No.",
        accessor: "request_no",
      },
      {
        Header: "Item Name",
        accessor: "item_id.label",
      },
      {
        Header: "Qty",
        accessor: "qty",
      },
      {
        Header: "Reason",
        accessor: "reason",
      },
      {
        Header: "Actions",
        Cell: (props: any) => (
          <div className="flex flex-row gap-3 min-w-fit ">
            <ActionButton
              data-modal="edit-virtual-po-request-modal"
              onClick={(e) => onModalOpen(e, props.row.original.id)}
              action="edit"
            />
            <ActionButton
              onClick={(e) =>
                dispatch(removeVirtualPOR(Number(props.row.original.id)))
              }
              action="delete"
            />
          </div>
        ),
      },
    ],
    []
  );

  if (!checkPermissions(["create-po-request"], user.roles)) {
    return <Forbidden />;
  }
  return (
    <div className="px-6 py-6 flex flex-col gap-6">
      <div className="max-w-fit">
        <Link href="/po-requests" passHref>
          <a>
            <Button
              icon={<BsArrowLeft />}
              outline
              size="medium"
              label="Go Back"
            />
          </a>
        </Link>
      </div>
      <hr />
      <PORequestForm className="flex flex-col xl:flex-row gap-6" isBulkAdd>
        <div className="border xl:w-3/4 h-12/12 bg-white rounded-lg flex flex-col justify-between">
          <div className=" text-xs mt-3 overflow-y-auto">
            <StyledTable
              minH="100%"
              fontSize="text-xs"
              noCheckbox
              columns={columns}
              data={data}
            />
          </div>
          {data.length < 1 && (
            <div className="self-center">No data available.</div>
          )}

          <div className="m-4 flex flex-col  justify-end md:flex-row gap-3 mt-6">
            <Button
              type="submit"
              width="wide"
              size="medium"
              label="Submit"
              colorScheme="primary"
              onClick={async () => {
                if (data.length > 0) {
                  let parsedData = data.map((d) => {
                    let parsedEl = {
                      ...d,
                      item_id: d.item_id.value,
                      storage_location_id: d.storage_location_id.value,
                    };
                    return parsedEl;
                  });
                  try {
                    await toast.promise(createMany(parsedData).unwrap(), {
                      success: "Request created successfully!",
                      error: "Error processing your request!",
                      pending: "Inserting request...",
                    });
                    router.push("/po-requests");
                    dispatch(resetPORState());
                  } catch (error: any) {
                    console.log(error);
                  }
                } else {
                  toast.error("Please add a request to continue...", {
                    toastId: "no-request-added",
                  });
                }
              }}
            />
          </div>
        </div>
      </PORequestForm>
      <AppModal
        title="Edit Pull-out Request"
        onClose={onModalClose}
        isOpen={modal === "edit-virtual-po-request-modal"}
      >
        <PORequestForm virtualId={selectedId} onClose={onModalClose} />
      </AppModal>
    </div>
  );
};

export default BulkCreatePoRequest;

BulkCreatePoRequest.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout icon={<BsBoxArrowLeft />} title="Pull-out Request Form">
      {page}
    </Layout>
  );
};
