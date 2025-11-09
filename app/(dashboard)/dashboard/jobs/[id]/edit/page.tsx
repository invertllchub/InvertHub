"use client";

import { useParams } from "next/navigation";
// Components
import EditJobForm from "@/components/dashboard/jobsComponents/EditjobForm";
// React Query
import useGetJobs from "@/hooks/useGetJobs";

function Page() {
  const {data : jobs = [], isLoading, error} = useGetJobs();
  const params = useParams();
  const jobId = Number(params.id)
  const job = jobs.find((j) => (j.id) === jobId);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold animate-pulse">Loading Jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl text-red-500 font-semibold">Failed to load Jobs 😞</p>
      </div>
    );
  }

  return (
    <div className="pl-0 md:pl-30 pr-0 md:pr-15 py-10 overflow-hidden bg-gray-200/75">
      <div className="w-full flex md:flex-row items-center justify-between gap-6 p-6 md:p-12">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800">Edit Job</h1>
        <button
          form="edit-job-form"
          type="submit"
          className="px-4 w-42 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg col-start-1 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
      <div className="mb-10">
        {job ? (
          <EditJobForm job={job} />
        ): (
          <p className="text-center text-gray-500">Job not found</p>
        )}
      </div>
    </div>
  );
}

export default Page;
