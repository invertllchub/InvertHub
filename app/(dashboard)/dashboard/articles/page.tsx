"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
// Components
const ToolBar = dynamic(() => import("@/components/dashboard/ToolBar"));
const MobileCard = dynamic(() => import("@/components/dashboard/MobileCard"));
const Pagination = dynamic(() => import("@/components/dashboard/Pagination"));
const Table = dynamic(() => import("@/components/dashboard/Table"), {
  ssr: false,
}) as typeof import("@/components/dashboard/Table").default;
// React Query
import useGetArticlesWithPagination, { fetchArticles } from "@/hooks/articles/useGetArticlesWithPagination";
import { useQueryClient } from "@tanstack/react-query";
// Types
import { Article } from "@/types/articles";
// Loading & Error State
import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";
// Debounce
import useDebounce from "@/hooks/useDebounce";


function Page() {
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchValue = useDebounce(searchValue, 2000);
  const { data, isLoading, isError } = useGetArticlesWithPagination(currentPage, 6, debouncedSearchValue);

  const articles = data?.data?.data || [];
  const totalPages = data?.data?.pagination?.totalPages ?? 1;

  useEffect(() => {
    const nextPage = currentPage + 1;
    if (nextPage > 2) return;
    queryClient.prefetchQuery({
      queryKey: ["articles", nextPage, searchValue],
      queryFn: () => fetchArticles(nextPage, 6, searchValue),
    })
  }, [currentPage, queryClient])


  const columns = [
    { key: "title", label: "Title", width: "400px" },
    { key: "author", label: "Author", width: "200px" },
    { key: "publicationDate", label: "Publication Date", width: "200px" },
    { key: "createdAt", label: "created At" },
    { key: "updatedBy", label: "updated By" },
    { key: "updatedAt", label: "updated At" },
  ];


  if (isError) {
    return (
      <div className="ml-0 md:ml-50 flex justify-center items-center h-screen">
        <ErrorState />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="ml-0 md:ml-50 flex justify-center items-center h-screen">
        <IsLoadingState />
      </div>
    );
  }


  return (
    <div className="pt-22 md:pt-12 md:ml-50 p-6 md:p-12 min-h-screen bg-[#D6F4ED] overflow-hidden">
      <ToolBar title="articles" setSearchValue={setSearchValue} />

      {/* TABLE VIEW (Desktop) */}
      <div className="hidden md:block w-full mt-8 overflow-x-auto">
        <Table<Article>
          page="articles"
          data={articles}
          columns={columns}
        />
      </div>

      {/* CARD VIEW (Mobile) */}
      <div className="block md:hidden mt-6  space-y-4">
        <MobileCard
          page="articles"
          data={articles}
          columns={columns}
        />
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex justify-center">
        <Pagination
          pageCount={totalPages}
          onPageChange={(page) => setCurrentPage(page + 1)}
          forcePage={currentPage - 1}
        />
      </div>
      
    </div>
  );
}

export default Page;
