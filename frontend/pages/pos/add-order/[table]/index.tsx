import ActionTableMenu from "@/components/ActionTableMenu";
import { Button } from "@/components/Button";
import Forbidden from "@/components/Forbidden";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import POSCategoryCard from "@/components/POSCategoryCard";
import POSReceipt from "@/components/POSReceipt";
import POSTableCard from "@/components/POSTableCard";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";
import { useSearchMenuItemCategoryQuery } from "@/redux/services/menuItemCategoriesAPI";
import checkPermissions from "@/utils/checkPermissions";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsArrowLeft, BsPlusCircle } from "react-icons/bs";

type Props = {};

const StepTwoSelectCategory = (props: Props) => {
  const { user } = useAuth();
  const methods = useForm();
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { filters, sortBy } = useAppSelector((state) => state.filters);

  const { data, error, isLoading } = useSearchMenuItemCategoryQuery({
    page,
    query,
    ...filters,
    ...sortBy,
  });

  useEffect(() => {
    if (data?.totalPages < 0) {
      setPage(0);
    } else if (page > data?.totalPages) {
      setPage(data.totalPages);
    }

    return () => {};
  }, [filters, data]);
  const onSubmitSearch = (data) => {
    setPage(0);
    setQuery(data.search);
  };

  if (!checkPermissions(["create-order"], user.roles)) {
    return <Forbidden />;
  }
  // if (error) return <p>Ooops. Something went wrong!</p>;
  // if (isLoading) return <Loading />;
  return (
    <div className="flex gap-4 flex-row">
      <div className="w-full">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitSearch)}>
            <ActionTableMenu
              title={
                <Link href="/pos/add-order" passHref>
                  <a>
                    <Button
                      icon={<BsArrowLeft />}
                      outline
                      size="medium"
                      label="Go Back"
                    />
                  </a>
                </Link>
              }
              onSubmit={onSubmitSearch}
            ></ActionTableMenu>
          </form>
        </FormProvider>
        {data && (
          <div className="p-4 flex flex-col gap-6">
            <ul className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-6 ">
              {data.body.map((menuCategory) => (
                <>
                  <POSCategoryCard
                    id={menuCategory.id}
                    key={menuCategory.id}
                    href={`/pos/add-order/${router.query.table}/${menuCategory.id}`}
                  >
                    {menuCategory.name}
                  </POSCategoryCard>
                </>
              ))}
            </ul>
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data.totalPages}
            />
          </div>
        )}
      </div>
      <div style={{ width: "500px" }} className="min-h-full">
        <POSReceipt />
      </div>
    </div>
  );
};

export default StepTwoSelectCategory;
StepTwoSelectCategory.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout icon={<BsPlusCircle />} title="Select Category">
      {page}
    </Layout>
  );
};
