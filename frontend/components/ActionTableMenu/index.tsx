import {
  resetFilters,
  resetSort,
  setFilters,
  setSort,
} from "@/redux/features/filterSlice";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BsSearch, BsSortAlphaUp, BsTrash } from "react-icons/bs";
import { options } from "../../stories/Dropdown.stories";
import BulkOperations from "../BulkOperations";
import { Button } from "../Button";
import Dropdown from "../Dropdown";

type Props = {
  title: any;
  filterOptions?: any[];
  sortOptions?: any[];
  searchPlaceholder?: string;
  onSubmit: (e: any) => void;
  operations?: any;
};

const ActionTableMenu: React.FC<Props> = ({
  children,
  filterOptions,
  sortOptions,
  searchPlaceholder = "Enter your search term...",
  title = "Equipment",
  operations,
}) => {
  const { register } = useFormContext();
  const [stateModal, setStateModal] = useState<any>({
    filter: false,
    sort: false,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      console.log("resetting filters & sort");
      dispatch(resetSort());
      dispatch(resetFilters());
    };
  }, []);

  const onFilterSelect = (e: { selector: string; value: string | number }) => {
    let selector;
    selector = filterOptions.find((el) => el.selector === e.selector);
    selector.selectedOption = e.value || "";
    dispatch(
      setFilters({
        selector: e.selector,
        value: e.value,
      })
    );
  };

  const onSortSelect = (e: { selector: string; value: any }) => {
    let selector;
    selector = sortOptions.find((el) => el.selector === e.selector);
    selector.selectedOption = e.value || "";
    dispatch(
      setSort({
        selector: e.value.selector,
        value: e.value.value,
      })
    );
  };

  return (
    <>
      <div className=" px-6 pb-4 pt-9 flex flex-row justify-between">
        <div className="flex flex-row gap-3 ">
          <h1 className="text-xl text-neutral-900 font-bold">{title}</h1>
        </div>
        <div className=" flex flex-row gap-3">{children}</div>
      </div>
      <hr />
      <div className="w-full  items-center  justify-between gap-3 flex flex-col md:flex-row  py-4 px-6">
        <div className=" flex flex-row items-center gap-1 w-full">
          <input
            {...register("search")}
            className="py-2 px-4 outline-none text-sm w-full md:w-60 lg:w-96 bg-gray-50 rounded-lg"
            type="search"
            placeholder={searchPlaceholder}
          />

          <Button
            type="submit"
            className="text-xs"
            size="medium"
            label="Search"
            iconSize={12}
            icon={<BsSearch />}
            outline
          ></Button>
        </div>
        <div className="flex flex-row gap-3">
          {filterOptions && (
            <Dropdown
              label="Filter"
              outline
              onClick={onFilterSelect}
              colorScheme="secondary"
              iconSize={20}
              options={filterOptions}
              stateModal={stateModal}
              setStateModal={setStateModal}
              type="filter"
            />
          )}
          {sortOptions && (
            <Dropdown
              label="Sort"
              icon={<BsSortAlphaUp />}
              outline
              colorScheme="secondary"
              iconSize={20}
              stateModal={stateModal}
              setStateModal={setStateModal}
              type="sort"
              onClick={onSortSelect}
              options={sortOptions}
            />
          )}
        </div>
      </div>
      <hr />
      <div className="w-full  items-center  justify-between gap-3 flex flex-col md:flex-row  py-4 px-9">
        <div className=" flex flex-row items-center gap-1 w-full">
          {operations}
        </div>
      </div>
      <hr />
    </>
  );
};

export default ActionTableMenu;
