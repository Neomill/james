import AsyncAppSelect from "@/components/AsyncAppSelect";
import { Button } from "@/components/Button";
import DisabledText from "@/components/DisabledText";
import Input from "@/components/Input";
import { ItemTransaction } from "@/components/Inventory/ItemDetails";
import Select from "@/components/Select";
import { addVirtualPOR, editVirtualPOR } from "@/redux/features/poRequestSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useLazyGetItemByIdQuery,
  useLazySearchItemsQuery,
} from "@/redux/services/itemsAPI";
import {
  useCreatePORequestMutation,
  useGetPORequestByIdQuery,
  useLazySearchPORequestQuery,
  useUpdatePORequestMutation,
} from "@/redux/services/poRequestAPI";
import { useLazySearchStorageLocationsQuery } from "@/redux/services/storageLocationAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsArrowClockwise, BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import * as yup from "yup";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  onClose?: () => void;
  id?: string;
  items?: any[];
  item_id?: string;
  isBulkAdd?: boolean;
  virtualId?: string;
  height?: string;
}

const defaultValues = {
  // request_no: "",
  reason: "",
  remarks: "",
  status: "",
  qty: null,
  item_id: null,
};

export const PORequestForm: React.FC<Props> = ({
  onClose,
  id,
  items = [],
  isBulkAdd = false,
  item_id,
  children,
  virtualId,
  height = "",
  ...props
}) => {
  const { data: virtualPOR } = useAppSelector((state) => state.poRequest);
  const [lazySearch] = useLazySearchPORequestQuery();
  const PORequestSchema = yup
    .object({
      remarks: yup.string().required(),
      // request_no: yup
      //   .string()
      //   .required()
      //   .test("checkDuplicate", "Request no. already used.", function (value) {
      //     return new Promise(async (resolve, reject) => {
      //       const alreadyExists = virtualPOR.some(
      //         (data) => data.request_no === value && data.id !== virtualId
      //       );
      //       if (alreadyExists) {
      //         toast.error("Please change the request no.", {
      //           toastId: "request-no-already-exists",
      //         });
      //         resolve(false);
      //       }
      //       resolve(true);
      //     });
      //   }),
      reason: yup.string().required(),
      status: yup.string().optional(),
      qty: yup.number().positive().integer().required(),
      item_transaction_id: yup.object().required(),
      storage_location_id: yup.object().required(),
    })
    .required();
  const methods = useForm({
    resolver: yupResolver(PORequestSchema),
  });
  const { watch } = methods;
  const watchReason = watch("reason", false);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const [create] = useCreatePORequestMutation();
  const [update] = useUpdatePORequestMutation();
  const { setValue, reset, control, getValues, setError } = methods;
  const dispatch = useAppDispatch();

  if (id) {
    const { data: po_request, isLoading: isUpdating } =
      useGetPORequestByIdQuery(id, {
        // pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
      });

    useEffect(() => {
      if (po_request) {
        setValue("remarks", po_request.remarks);
        setValue("reason", po_request.reason);
        setValue("status", po_request.status);
        setValue("qty", po_request.qty);
        setValue("item_transaction_id", {
          label: po_request.item_transaction?.expiry_date,
          value: po_request.item_transaction_id,
        });
        setValue("storage_location_id", {
          label: po_request.storage_location?.name,
          value: po_request.storage_location_id,
        });
      }
      return () => {};
    }, [id, po_request]);
  } else if (virtualId) {
    const virtualPo = virtualPOR.find(
      (po) => Number(po.id) === Number(virtualId)
    );
    useEffect(() => {
      if (virtualPo) {
        setValue("remarks", virtualPo.remarks);
        setValue("reason", virtualPo.reason);
        setValue("status", virtualPo.status);
        setValue("qty", virtualPo.qty);
        setValue("item_id", {
          label: virtualPo.item_id.label,
          value: virtualPo.item_id.value,
        });
        setValue("storage_location_id", {
          label: virtualPo.storage_location_id.label,
          value: virtualPo.storage_location_id.value,
        });
      }
    }, [virtualPo]);
  }

  const [lazyGetItem] = useLazyGetItemByIdQuery();
  const [item, setItem] = useState(null);
  if (item_id) {
    useEffect(() => {
      const getItem = async () => {
        const res = await lazyGetItem(item_id).unwrap();
        setItem(res);
        setValue("item_id", {
          label: res.name,
          value: res.id,
        });
        setValue("storage_location_id", {
          label: res.storage_location.name,
          value: res.storage_location_id,
        });
      };
      getItem();
      return () => {
        setItem(null);
      };
    }, []);
  }

  const [lazySearchItems] = useLazySearchItemsQuery();
  async function loadOptions(search, loadedOptions, { page }) {
    const res = await lazySearchItems({
      page,
      query: search,
    }).unwrap();
    return {
      options: res?.body.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      hasMore: res.hasMore,
      additional: {
        page: page + 1,
      },
    };
  }
  const [lazySearchLocation] = useLazySearchStorageLocationsQuery();
  async function loadSlOptions(search, loadedOptions, { page }) {
    const res = await lazySearchLocation({
      page,
      query: search,
    }).unwrap();
    return {
      options: res?.body.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      hasMore: res.hasMore,
      additional: {
        page: page + 1,
      },
    };
  }

  async function loadItemTransactions(data: ItemTransaction[]) {
    return {
      options: data?.map((item) => ({
        value: item.id,
        label: `#${item.id} (${dayjs(item.expiry_date).format("MM-DD-YYYY")})`,
      })),
    };
  }

  const onSubmit = async (data: any) => {
    if (!virtualId && !isBulkAdd) {
      data.item_transaction_id = data.item_transaction_id.value;
      data.storage_location_id = data.storage_location_id.value;
    }
    try {
      if (id)
        toast.promise(update({ id, ...data }).unwrap(), {
          success: "Request updated successfully!",
          error: "Error updating request!",
          pending: "Updating request...",
        });
      else if (virtualId) {
        dispatch(editVirtualPOR({ id: Number(virtualId), data }));
      } else if (isBulkAdd) {
        const res = await lazySearch({
          page: 0,
          query: data.request_no.trim(),
        }).unwrap();
        if (res.body.length > 0) {
          setError("request_no", {
            type: "custom",
            message: "Request no already exists.",
          });
          toast.error("Request no already exists.", {
            toastId: "request-no-duplicate",
          });
        } else {
          dispatch(addVirtualPOR(data));
          toast.success("Request added to list.");
        }
      } else {
        toast.promise(
          create({
            ...data,
          }).unwrap(),
          {
            success: "Request created successfully!",
            error: "Error processing your request!",
            pending: "Creating request...",
          }
        );
      }

      onClose && onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div {...props}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div
            style={{ height: height }}
            className={`w-full   border-0 flex flex-col gap-9 `}
          >
            <div
              className={[
                "justify-between  flex flex-col md:flex-row gap-3",
              ].join(" ")}
            >
              <div className={`w-96  flex flex-col gap-2 `}>
                {item && (
                  <>
                    <DisabledText label="Item Name">{item.name}</DisabledText>
                    <DisabledText label="Item Qty">{item?.qty}</DisabledText>
                    <hr />
                  </>
                )}

                {isBulkAdd && (
                  <>
                    <AsyncAppSelect
                      name="item_id"
                      label="Item"
                      placeholder="Select Item"
                      loadOptions={loadOptions}
                    />
                  </>
                )}

                {item && (
                  <AsyncAppSelect
                    name="item_transaction_id"
                    label="Item Transaction"
                    placeholder="Select Transaction to Pull out"
                    loadOptions={() =>
                      loadItemTransactions(item.item_transactions)
                    }
                  />
                )}
                <Select
                  name="reason"
                  options={[
                    { id: "OVERSTOCKING", name: "Overstocking" },
                    { id: "EXPIRED", name: "Expired" },
                    { id: "BAD_ORDER", name: "Bad Order" },
                    { id: "STOCK_TRANSFER", name: "Stock Transfer" },
                    { id: "OTHERS", name: "Others" },
                  ]}
                  label="Reason"
                  placeholder="Select Reason"
                />
                {methods.getValues("reason") === "STOCK_TRANSFER" && (
                  <AsyncAppSelect
                    name="storage_location_id"
                    label="Transfer Location"
                    placeholder="Select Location"
                    loadOptions={loadSlOptions}
                  />
                )}

                {/* <Input
                  name="request_no"
                  label="Request No."
                  placeholder="Request No."
                /> */}
                <Input
                  type="number"
                  min={1}
                  name="qty"
                  label="Quantity to pull-out"
                  placeholder="Enter Quantity"
                />
                {id && (
                  <Select
                    name="status"
                    options={[
                      { id: "PENDING", name: "Pending" },
                      { id: "RETURNED", name: "Returned" },
                    ]}
                    label="Status"
                    placeholder="Select Status"
                  />
                )}

                <Input name="remarks" label="Remarks" placeholder="Remarks" />
              </div>
            </div>

            <div className="flex flex-col  justify-end md:flex-row gap-3">
              {isBulkAdd && (
                <Button
                  type="button"
                  width="wide"
                  size="medium"
                  colorScheme="danger"
                  onClick={() => {
                    reset(defaultValues);
                  }}
                  outline={isBulkAdd}
                  icon={isBulkAdd && <BsArrowClockwise />}
                  label={"Reset Fields"}
                />
              )}
              <Button
                className={`${height && "mb-6"}`}
                type="submit"
                width="wide"
                size="medium"
                outline={isBulkAdd}
                icon={isBulkAdd && <BsPlus />}
                label={isBulkAdd ? "Add to List" : id ? "Update" : "Submit"}
              />
            </div>
          </div>
        </form>
      </FormProvider>
      {children}
    </div>
  );
};
