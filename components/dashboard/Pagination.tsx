"use client";

import React from "react";
import "../../app/(main)/globals.css"
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
  forcePage?: number;
}

function Pagination({ pageCount, onPageChange, forcePage }: PaginationProps) {
  return (
<ReactPaginate
  breakLabel="..."
  nextLabel="Next ›"
  previousLabel="‹ Prev"
  pageRangeDisplayed={3}
  pageCount={pageCount}
  forcePage={forcePage}
  onPageChange={(e) => onPageChange(e.selected)}

  containerClassName="md:fixed md:bottom-5 flex items-center gap-3 p-3 bg-white shadow-lg rounded-xl border border-gray-100"
  pageClassName="list-none rounded-full"
  pageLinkClassName="flex items-center justify-center h-9 w-9 rounded-full text-sm font-medium 
  border  cursor-pointer 
  hover:bg-(--secondary) transition-all hover:shadow"

  activeLinkClassName="!bg-(--primary) hover:bg-(--secondary) !text-white !shadow-md"

  previousLinkClassName="px-4 h-9 flex items-center border border-gray-200 rounded-lg text-sm cursor-pointer 
  hover:bg-(--secondary) transition-all hover:shadow"

  nextLinkClassName="px-4 h-9 flex items-center border border-gray-200 rounded-lg text-sm cursor-pointer 
  hover:bg-(--secondary) transition-all hover:shadow"

  disabledClassName="opacity-40 cursor-not-allowed"
/>

  );
}

export default React.memo(Pagination);
