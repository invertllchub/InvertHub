"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// Components
const ToolBar = dynamic(() => import("@/components/dashboard/ToolBar"));
const MobileCard = dynamic(() => import("@/components/dashboard/MobileCard"));
const Pagination = dynamic(() => import("@/components/dashboard/Pagination"));
const Table = dynamic(() => import("@/components/dashboard/Table"), { ssr: false }) as typeof import("@/components/dashboard/Table").default;
// Hooks
import { fetchUsers } from "@/hooks/users/useGetUsers";
import { useQueryClient } from "@tanstack/react-query";
import useGetUsers from "@/hooks/users/useGetUsers";
import useDebounce from "@/hooks/useDebounce";
// Types
import { User } from "@/types/users";
// Loading & Error States
import IsLoadingState from "@/components/states/IsLoadingState";
import ErrorState from "@/components/states/ErrorState";

function Page() {
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchValue = useDebounce(searchValue, 2000);
  const { data, isLoading, isError } = useGetUsers(currentPage, 6, debouncedSearchValue);

  const users = data?.data?.data || [];
  const totalPages = data?.data?.pagination?.totalPages ?? 1;

  useEffect(() => {
    const nextPage = currentPage + 1;
    if (nextPage > 2) return;
    queryClient.prefetchQuery({
      queryKey: ["users", nextPage, searchValue],
      queryFn: () => fetchUsers(nextPage, 6, searchValue),
    })
  }, [currentPage, queryClient])

  const columns = [
    { key: "isActive", label: "", width: "20px" },
    { key: "fullName", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", width: "100px" },
    { key: "jobTitle", label: "Job Title", width: "150px" },
    { key: "lastLoginAt", label: "Last Login Date", width: "200px" },
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
      <ToolBar title="users" setSearchValue={setSearchValue} />

      {/* TABLE VIEW */}
      <div className="hidden md:block w-full mt-8 overflow-x-auto">
        <Table<User>
          page="users"
          data={users}
          columns={columns}
        />
      </div>

      {/* MOBILE VIEW */}
      <div className="block md:hidden mt-6 space-y-4 pb-24">
        <MobileCard
          page="users"
          data={users}
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
