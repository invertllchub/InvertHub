"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// Components
const ToolBar = dynamic(() => import("@/components/dashboard/ToolBar"));
const MobileCard = dynamic(() => import("@/components/dashboard/MobileCard"));
const Pagination = dynamic(() => import("@/components/dashboard/Pagination"));
const Table = dynamic(() => import("@/components/dashboard/Table"), {
  ssr: false,
}) as typeof import("@/components/dashboard/Table").default;
// React Query & Hooks
import useGetJobsWithPagination from "@/hooks/jobs/useGetJobsWithPagination";
import useDebounce from "@/hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { fetchJobs } from "@/hooks/jobs/useGetJobsWithPagination";
// Types
import { Job } from "@/types/jobs";
// Loading & Error State
import ErrorState from "@/components/states/ErrorState";
import IsLoadingState from "@/components/states/IsLoadingState";


function JobsPage() {
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchValue = useDebounce(searchValue, 2000);
  const { data, isLoading, isError } = useGetJobsWithPagination(currentPage, 6, debouncedSearchValue);

  const jobs = data?.data?.data || [];
  const totalPages = data?.data?.pagination?.totalPages ?? 1;


  useEffect(() => {
    const nextPage = currentPage + 1;
    if (nextPage > 2) return;
    queryClient.prefetchQuery({
      queryKey: ["jobs", nextPage, searchValue],
      queryFn: () => fetchJobs(nextPage, 6, searchValue),
    })
  }, [currentPage, queryClient])
    
  const columns = [
    { key: "title", label: "Title" },
    { key: "employmentType", label: "Employment Type" },
    { key: "status", label: "Status" },
    { key: "closingDate", label: "Closing Date" },
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
    <div className="pt-22 md:pt-12 md:ml-50 p-6 md:p-12 min-h-screen bg-(--secondary) overflow-hidden">
      {/* Tool Bar */}
      <ToolBar title="jobs" setSearchValue={setSearchValue} />

      {/* TABLE VIEW (Desktop) */}
      <div className="hidden md:block w-full mt-8 overflow-x-auto">
        <Table<Job>
          page="jobs"
          data={jobs}
          columns={columns}
        />
      </div>

      {/* CARD VIEW (Mobile) */}
      <div className="block md:hidden mt-6  space-y-4">
        <MobileCard
          page="jobs"
          data={jobs}
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

export default JobsPage;
