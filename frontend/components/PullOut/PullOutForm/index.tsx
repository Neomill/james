import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryByIdQuery,
} from "@/redux/services/categoriesAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { toast } from "react-toastify";
import {
  useCreateBranchMutation,
  useGetBranchByIdQuery,
  useUpdateBranchMutation,
} from "@/redux/services/branchAPI";
import {useSearchMenuItemsQuery} from "@/redux/services/menuItemsAPI";
import AsyncAppSelect from "@/components/AsyncAppSelect";
import StyledTable from "@/components/StyledTable";
import ActionButton from "@/components/ActionButton";
import {
  removeMenuItem
} from "@/redux/features/menuItemSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const BranchSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

interface Props {
  onClose: () => void;
  id?: string;
}

export const BranchForm: React.VFC<Props> = ({ onClose, id }) => {
  const methods = useForm({
    resolver: yupResolver(BranchSchema),
  });
  const [create, { isLoading: isCreating }] =
    useCreateBranchMutation();
  const [update, result] = useUpdateBranchMutation();

  const [selectedId, setSelectedId] = useState("");
  const [modal, setModal] = useState<string>("");

  if (id) {
    const { data: branch, isLoading: isUpdating } =
      useGetBranchByIdQuery(id, {
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
      });
    useEffect(() => {
      if (branch) {
        const { setValue } = methods;
        setValue("name", branch.name);
      }
      return () => {};
    }, [id, branch]);
  }

  
  const onSubmit = async (data: any) => {
    try {
      if (id)
        toast.promise(update({ id, ...data }).unwrap(), {
          success: "Branch updated successfully!",
          error: "Error updating Branch!",
          pending: "Updating Branch...",
        });
      else
        toast.promise(create(data).unwrap(), {
          success: "Branch created successfully!",
          error: "Error creating Branch!",
          pending: "Creating Branch...",
        });
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  const [menuItemsPage, setMenuItemPage] = useState(0);
  const [menuItemsQuery, setMenuItemQuery] = useState("");
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.menuItems);

  const { data: menuItemsAPI } = useSearchMenuItemsQuery({
    page: menuItemsPage,
    query: menuItemsQuery,
  });

  async function loadMenuItemOptions(search, loadedOptions, { page }) {
    setMenuItemPage(page);
    setMenuItemQuery(search);
    return {
      options: menuItemsAPI?.body?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      hasMore: menuItemsAPI.hasMore,
      additional: {
        page: page + 1,
      },
    };
  }

  const onModalOpen = (event, id?) => {
    event.preventDefault();
    const modal = event.currentTarget.getAttribute("data-modal");

    if (id) {
      setSelectedId(id);
    }
    if (modal) setModal(modal);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "name",
      },
            {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Qty",
        accessor: "qty",
      },
      {
        Header: "Actions",
        Cell: (props: any) => (
          <div className="flex flex-row gap-3 min-w-fit ">
            <ActionButton
              data-modal="edit-virtual-menu-item-modal"
              onClick={(e) => onModalOpen(e, props.row.original.id)}
              action="edit"
            />
            <ActionButton
              onClick={(e) =>
                dispatch(removeMenuItem(Number(props.row.original.id)))
              }
              action="delete"
            />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <FormProvider {...methods}>
      <form className="h-72" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={" border-0 flex flex-row gap-5 w-full"}>
          <div
            className={["justify-between flex flex-row gap-3 w-3/6"].join(
              " "
            )}
          >
            <div>
              <AsyncAppSelect
                  width={`w-50`}
                  name="menu_item"
                  label="product"
                  placeholder="Select Product to Pull Out"
                  loadOptions={loadMenuItemOptions}
                />
              <Input
                name="description"
                label="Description"
                placeholder="description or reason"
              />
              <Input
                name="qty"
                min={0}
                label="Product Quantity"
                placeholder="Product Quantity"
                type="number"
              />
              <div className="flex mt-2 flex-col justify-end md:flex-row gap-3">
                <Button
                  type="submit"
                  width="normal"
                  size="small"
                  label="Add Product"
                />
              </div>
            </div>
          </div>
          <div className="border w-96 h-12/12 bg-white rounded-lg flex flex-col justify-between">
          <div className="text-xs w-96 mt-3 overflow-y-auto">
            <StyledTable
              minH="100%"
              fontSize="text-xs"
              noCheckbox
              columns={columns}
              data={data}
            />
          </div>
          {/* {data.length < 1 && ( */}
            <div className="self-center">No data available.</div>
          {/* )} */}

          <div className="m-4 flex flex-col  justify-end md:flex-row gap-3 mt-6">
            <Button
              type="submit"
              width="wide"
              size="medium"
              label="Submit"
              onClick={async () => {

              }}
            />
          </div>
      </div>
        </div>
      </form>
    </FormProvider>
  );
};
