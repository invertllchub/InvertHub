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
// React Query
import useGetProjectsWithPagination from "@/hooks/projects/useGetProjectsWithPagination";
import useDebounce from "@/hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { fetchProjects } from "@/hooks/projects/useGetProjectsWithPagination";
// Types
import { Project } from "@/types/project";
// Loading & Error State
import IsLoadingState from "@/components/states/IsLoadingState";
import ErrorState from "@/components/states/ErrorState";

function page() {
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchValue = useDebounce(searchValue, 2000);
  const { data, isLoading, isError } = useGetProjectsWithPagination(currentPage, 6, debouncedSearchValue);

  const projects = data?.data?.data || [];
  const totalPages = data?.data?.pagination?.totalPages ?? 1;

  useEffect(() => {
    const nextPage = currentPage + 1;
    if (nextPage > 2) return;
    queryClient.prefetchQuery({
      queryKey: ["projects", nextPage, searchValue],
      queryFn: () => fetchProjects(nextPage, 6, searchValue),
    })
  }, [currentPage, queryClient])

  const columns = [
    { key: "name", label: "Title" },
    { key: "link", label: "Link" },
    { key: "createdBy", label: "created By" },
    { key: "createdAt", label: "created At" },
    { key: "updatedBy", label: "updated By" },
    { key: "updatedAt", label: "updated At" },
  ];


  if (isError) {
    return (
      <div className="ml-50 flex justify-center items-center h-screen">
        <ErrorState />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="ml-50 flex justify-center items-center h-screen">
        <IsLoadingState />
      </div>
    );
  }
  
  return (
    <div className="pt-22 md:pt-12 md:ml-50 p-6 md:p-12 min-h-screen bg-(--secondary) overflow-hidden">
      <ToolBar title="projects" setSearchValue={setSearchValue} />

      {/* TABLE VIEW (Desktop) */}
      <div className="hidden md:block w-full mt-8 overflow-x-auto">
        <Table<Project>
          page="projects"
          data={projects}
          columns={columns}
        />
      </div>

      {/* CARD VIEW (Mobile) */}
      <div className="block md:hidden mt-6  space-y-4">
        <MobileCard
          page="projects"
          columns={columns}
          data={projects}
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

export default page;


