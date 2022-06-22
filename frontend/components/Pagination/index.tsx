import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";

type Props = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const Pagination = ({ page, setPage, totalPages }: Props) => {
  const itemsPerPage = 10;
  const onNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const onPrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const PrevPage = () => {
    return (
      <div
        onClick={onPrevPage}
        className={`${
          page === 0
            ? "bg-gray-50 cursor-not-allowed"
            : "bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700"
        } items-center justify-center text-center flex rounded-lg  cursor-pointer  font-bold text-sm w-9 h-9 mr-2`}
      >
        <BsChevronLeft />
      </div>
    );
  };
  const NextPage = () => {
    return (
      <div
        onClick={onNextPage}
        className={`${
          page === totalPages
            ? "bg-gray-50 cursor-not-allowed"
            : "bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700"
        }  items-center justify-center text-center flex rounded-lg cursor-pointer  font-bold text-xs w-9 h-9 ml-2`}
      >
        <BsChevronRight />
      </div>
    );
  };
  const handlePageClick = (event) => {
    console.log("here", event);
    setPage(event.selected);
  };

  return (
    <div className=" rounded-lg p-1 flex flex-row gap-3 justify-end">
      <ReactPaginate
        activeClassName="bg-gray-100 text-xs items-center justify-center text-center flex rounded-lg text-gray-900 cursor-pointer hover:bg-gray-100 hover:text-gray-700 font-medium w-9 h-9"
        breakLabel="..."
        forcePage={page}
        nextLabel={<NextPage />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages + 1}
        previousLabel={<PrevPage />}
        renderOnZeroPageCount={null}
        pageClassName="mx-0.5"
        pageLinkClassName="text-sm items-center justify-center text-center flex rounded-lg text-gray-900 cursor-pointer hover:bg-gray-100 hover:text-gray-700 font-medium w-9 h-9"
        className="paginate-page text-xs "
      />
    </div>
  );
};

export default Pagination;
